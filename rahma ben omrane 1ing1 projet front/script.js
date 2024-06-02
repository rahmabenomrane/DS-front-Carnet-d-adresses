$(document).ready(function() {
    // Initialisation des contacts
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    var selectedIndex = null; // Index du contact sélectionné
    $('#clearcontact-btn').prop('disabled', false); // Activer le bouton "Effacer" pour le contact sélectionné

    
    // Affichage initial des contacts
    displayContacts();
    
    $('#contact-details').hide();
    // Cacher le conteneur des formulaires initialement
    $('.form-container').hide();

    // Bouton "Nouveau contact"
    $('#new-contact-btn').click(function() {
        $('#contact-form').show();
        $('.form-container').show();
        $('#contact-details').hide(); // Cacher les détails du contact lors de la création d'un nouveau contac    
    });
    
        // Affichage des détails d'un contact et bouton "Editer le contact"
        $('#contacts-list').on('click', '.contact', function() {
            console.log($(this).data());
            selectedIndex = $(this).data('index'); // Stocker l'index du contact sélectionné
              // Retirer la classe "selected" de tous les contacts
        $('.contact').removeClass('selected');
        // Ajouter la classe "selected" au contact cliqué
        $(this).addClass('selected');
        // Afficher les détails du contact sélectionné ou effectuer d'autres actions
    
            var index = selectedIndex;
            var contact = contacts[index];
            $('.form-container').show();
            $('#details').html(contact.gender+'<br>' + ' ' + contact.firstName + ' ' + contact.lastName +'<br>tel:' + contact.phone);
            $('#edit-contact-btn').data('index', index);
            $('#contact-details').show();
            $('#contact-form').hide(); // Cacher le formulaire lors de l'affichage des détails du contact
        });
      
        
        $(document).on('click', function(event) {
            // Vérifier si l'élément cliqué n'est pas un contact ni le bouton "Nouveau contact"
            if (!$(event.target).closest('.contact').length && !$(event.target).is('#new-contact-btn') && !$(event.target).closest('.form-container').length) {
                // Annuler la sélection
                selectedIndex = null; // Réinitialiser l'index du contact sélectionné
                console.log('selectedindx',selectedIndex);
                $('.contact').removeClass('selected');
                $('#contact-details').hide();
                $('.form-container').hide();
               // $('#clear-selected-contact-btn').prop('disabled', true);
                
                // Masquer le formulaire d'édition du contact
                $('#contact-form').hide();
            }
        });
    // Bouton "Enregistrer"
    $('#save-contact-btn').click(function() {
        var gender = $('#gender').val();
        var firstName = $('#first-name').val();
        var lastName = $('#last-name').val();
        var phone = $('#phone').val();
        
        var index = selectedIndex;
        if (index !== null) { // S'il y a un index sélectionné, il s'agit d'une modification
            contacts[index] = {
                gender: gender,
                firstName: firstName,
                lastName: lastName,
                phone: phone
            };
            console.log(selectedIndex);
            selectedIndex = null; // Réinitialiser l'index sélectionné après la modification
            
        } else { // Sinon, il s'agit d'un ajout
            contacts.push({
                gender: gender,
                firstName: firstName,
                lastName: lastName,
                phone: phone
            });
        }
        localStorage.setItem('contacts', JSON.stringify(contacts));
        //La méthode JSON.stringify() convertit l'objet JavaScript contacts en une chaîne JSON.
        displayContacts();
        $('#contact-form').hide();
        $('#first-name').val('');
        $('#last-name').val('');
        $('#phone').val('');
    });

    //Bouton "Effacer" pour le formulaire
    $('#clear-form-btn').click(function() {
        $('#first-name').val('');
        $('#last-name').val('');
        $('#phone').val('');
    });

    // Bouton "Effacer" pour le contact sélectionné
  /*  $('#clear-selected-contact-btn').click(function() {
        if (selectedIndex !== null) {
            contacts.splice(selectedIndex, 1); // Supprimer le contact du tableau
            localStorage.setItem('contacts', JSON.stringify(contacts));
            displayContacts();
            $('#contact-details').hide();
            $('#clear-selected-contact-btn').prop('disabled', true); // Désactiver le bouton "Effacer" pour le contact sélectionné
            selectedIndex = null; // Réinitialiser l'index du contact sélectionné
        }
    });*/

    $('#clearcontact-btn').click(function() {
        if (confirm("Êtes-vous sûr de vouloir effacer tous les contacts ?")) {
            contacts = []; // Vide le tableau des contacts
            localStorage.removeItem('contacts'); // Supprime les contacts du localStorage
            displayContacts(); // Rafraîchit l'affichage des contacts (qui sera vide après cette opération)
            $('#contact-details').hide(); // Cache les détails du contact s'ils sont visibles
            //$('#clear-selected-contact-btn').prop('disabled', true); // Désactive le bouton "Effacer" pour le contact sélectionné s'il est actif
            selectedIndex = null; // Réinitialise l'index du contact sélectionné
        }
    });
    


    
  // Bouton "Editer le contact"
$('#edit-contact-btn').click(function() {
    var index = $(this).data('index');
    var contact = contacts[index];
    $('.form-container').show(); // Utiliser '.form-container' au lieu de '#form-container'
    $('#gender').val(contact.gender);
    $('#first-name').val(contact.firstName);
    $('#last-name').val(contact.lastName);
    $('#phone').val(contact.phone);
    $('#contact-form').show();
    $('#contact-details').hide(); // Cacher les détails du contact lors de l'édition
});

// Affichage des contacts
function displayContacts() {
    $('#contacts-list').empty();
    
    $('.form-container').hide(); 
    if (contacts.length === 0) {
        $('#contacts-list').append('<p>Aucun contact pour le moment</p>');
    } else {
        var Ordre = { 'Mademoiselle': 1, 'Madame': 2, 'Monsieur': 3 };
        contacts.sort(function(a, b) {
            var titleA = Ordre[a.gender];
            var titleB = Ordre[b.gender];

            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1
            };
            if (a.lastName < b.lastName) {
                return -1;
            }
            if (a.lastName > b.lastName) {
                return 1;
            }
            // Si les noms de famille sont identiques, trier par prénom
            if (a.firstName < b.firstName) {
                return -1;
            }
            if (a.firstName > b.firstName) {
                return 1;
            }
            return 0;
        });
        

        // Afficher les contacts triés
        contacts.forEach(function(contact, index) {
            var contactHtml = '<div class="contact" data-index="' + index + '">' +
                                contact.firstName + ' ' + contact.lastName +
                                '</div>';
            $('#contacts-list').append(contactHtml);
        });
    }
}


});
