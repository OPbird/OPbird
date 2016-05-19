angular.module("FinalApp")
    .directive('ngConfirmClick', [
    function(){
        return {
            priority: 1,
            terminal: true,
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.ngClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }])
    .filter('convertState', function ($sce) {
        return function (state) {
            var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
            var res = state.split(" ");
            var texto = "";
            for (var i = 0; i < res.length; i++) {
                if(res[i].match(urlPattern)) {
                    res[i] = "<a target='_blank' href='" + res[i] + "'>" + res[i] + "</a>";
                }
                texto += res[i] + " ";
            }
            return $sce.trustAsHtml(texto);
        }
    });
