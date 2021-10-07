document.addEventListener('DOMContentLoaded', async (event) => {
    const data = await readData();
    generateMenu(data);
});
const readData = async () => {
    const url = 'http://127.0.0.1:3000/foods/';
    const data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(response => response.json()).then(data => data).catch(console.log);
    return await data
}
const createAlert = (message, alerttype) => {
    var alert = document.createElement('div')
    var messageAlert = document.createElement('span')
    alert.setAttribute('id', 'alertInstance')
    alert.setAttribute('class', `alert ${alerttype} close`)
    alert.setAttribute('data-dismiss', 'alert');
    messageAlert.innerHTML = message;
    alert.appendChild(messageAlert);
    document.getElementById('myAlert').appendChild(alert);
    setTimeout(function() {
        document.getElementById("alertInstance").remove();
    }, 5000);
}
const generateMenu = (data) => {
    const form = document.getElementById('generateMenu')
    const menu = document.getElementById('menu');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (data.length < 3) {
            createAlert('Jumlah data dalam menu masih kurang dari 3', 'alert-danger')
        } else {
            var newData = shuffle(data)
            menu.querySelector('#breakfast').innerHTML = newData[0].nama;
            menu.querySelector('#launch').innerHTML = newData[1].nama;
            menu.querySelector('#dinner').innerHTML = newData[2].nama;
            menu.classList.toggle('collapse');
        }
    });
}
const shuffle = (data) => {
    for (var i = 0; i < data.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (data.length - i));
        var temp = data[j];
        data[j] = data[i];
        data[i] = temp;
    }
    return data;
}
const sleep = () => new Promise(resolve => setTimeout(resolve, 5000));