$(function () {

    //Generowanie ID
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    //Klasa Column
    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add new card');

            //Podpinanie zdarzeń
            $columnDelete.click(function() {
                self.removeColumn();
            });
            //Add a note after clicking on the button:
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });
            //Konstruowanie kolumny
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            return $column;//UWAGA! Element kolumny należy zwrócić! (return $column). Bez tego nie mielibyśmy odniesienia do stworzonego elementu tam, gdzie wywołujemy funkcję.
            }
        };

    //Metoda addCard()
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        //Metoda removeColumn
        removeColumn: function() {
            this.$element.remove();
        }
    };
    //Klasa Card
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard(); //
        //Funkcja: createCard() // CREATING THE BLOCKS
        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
        //Podpinanie zdarzeń // BINDING TO CLICK EVENT
        $cardDelete.click(function(){
            self.removeCard();
        });
        //Konstruowanie karty // COMBINING BLOCKS AND RETURNING THE CARD
        $card.append($cardDelete)
            .append($cardDescription);
        return $card;
        }
    }
    //Metoda dla klasy Card
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    //Obiekt tablicy
    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };

    //drag'n'drop
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    $('.create-column')
        .click(function(){
            var name = prompt('Enter a column name');
            var column = new Column(name);
                board.addColumn(column);
    });

    // TWORZENIE KOLUMN
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // DODAWANIE KART DO KOLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);

});