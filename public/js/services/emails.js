angular.module("FinalApp")
    .service('emailService', function() {
        var email = "";

        var setEmail = function(newEmail) {
            email = newEmail;
        };

        var getEmail = function() {
            return email;
        };

        return {
            setEmail: setEmail,
            getEmail: getEmail
        };
});