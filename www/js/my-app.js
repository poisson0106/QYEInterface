// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    precompileTemplates: true,
    template7Pages: true,
    template7Data: {
        cars: [
            {
                vendor: 'Volkswagen',
                model: 'Passat',
                power: 152,
                speed: 280,
                weight: 1400,
                color: 'black',
                year: 2012,
                description: ''
            },
            {
                vendor: 'Skoda',
                model: 'Superb',
                power: 152,
                speed: 260,
                weight: 1600,
                color: 'white',
                year: 2013,
                description: ''
            },
            {
                vendor: 'Ford',
                model: 'Mustang',
                power: 480,
                speed: 320,
                weight: 1200,
                color: 'red',
                year: 2014,
                description: ''
            },
        ],
    }
});

mainView.hideNavbar();

myApp.onPageInit('index', function (page) {
    // run createContentPage func after link was clicked
    $$("#toWeibo").click(function(){
        $$.ajax({
            url : 'http://9.123.200.73:8080/bookcapture/getWeibo',
            method : 'GET',
            data : {
                begin : 0,
                end : 5
            },
            dataType : "json",
            success : function(data, status, xhr){
                if(data != null){
                    /*for(i=0;i<data.length;i++){
                        myApp.alert(data[i].postDate,"QY");
                    }*/
                    mainView.router.load({
                        url : 'weibo.html',
                        context: {
                            tel: '(999)-111-22-33',
                            email: 'contact@john.doe'
                        }
                    });
                }
                else
                    myApp.alert("Empty", "QY");
            },
            error : function (xhr, status){
                myApp.alert("Error", "QY");
            }
        });
    });
});

myApp.onPageInit('weibo',function(page){
    var context = page.context;
    if(context==null)
        myApp.alert(context,"QY");
});

$$("#toLogin").click(function(){
    $$.ajax({
        url : 'http://9.123.200.73:8080/bookcapture/loginOneUser',
        method : 'POST',
        data : {
            username : $$("#username").val(),
            password : $$("#password").val()
        },
        dataType : "json",
        success : function(data, status, xhr){
            var url = data.targetUrl;
            if(url!="")
                mainView.router.loadPage(url);   
        },
        error : function (xhr, status){
            myApp.alert("Username or Password invaild", "QY");
        }
    });
});

