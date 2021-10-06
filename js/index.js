document.addEventListener('DOMContentLoaded', async function(event) {
    const menuUrl = 'http://192.168.0.105:5500/menu.json';
    const menu = await getMenu(menuUrl);
    updateTable(menu)
    addFood(menu);
});
const createAlert = async (message, alerttype) => {
    var alert = document.createElement('div')
    var messageAlert = document.createElement('span')
    alert.setAttribute('id', 'alertInstance')
    alert.setAttribute('class', `alert ${alerttype} close`)
    alert.setAttribute('data-dismiss', 'alert');
    messageAlert.innerHTML = message;
    alert.appendChild(messageAlert)
    document.getElementById('myAlert').appendChild(alert)
    setTimeout(function() {
        document.getElementById("alertInstance").remove();
    }, 3000);
}
const addFood = (menu) => {
    'use-strict'
    const form = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(form).forEach(function(form) {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                form.classList.add('was-validated');
                createAlert("Data gagal di tambahkan", "alert-danger");
                setTimeout(function() {
                    form.classList.remove('was-validated');
                }, 3000);
            } else {
                let food = {
                    id: menu.length + 1,
                    name: form.elements['nama'].value,
                    harga: form.elements['harga'].value,
                };
                console.log(food);
                createAlert("Data berhasil di tambahkan", "alert-success");
                form.reset();
                form.classList.remove('was-validated');
            }
        }, false)
    })
}
const updateTable = (menu) => {
    var table = document.getElementById('foodTable').querySelector('tbody');
    menu.forEach(food => {
        var row = table.insertRow(-1);
        var del = document.createElement('button')
        del.setAttribute('class', 'btn btn-sm btn-danger me-3')
        del.setAttribute('style', 'width: 8px, height: 8px')
        del.innerHTML = '<i class="far fa-trash-alt"></i>';
        var edit = document.createElement('button')
        edit.setAttribute('class', 'btn btn-sm btn-success mr-3')
        edit.setAttribute('style', 'width: 8px, height: 8px')
        edit.innerHTML = '<i class="far fa-trash-alt"></i>';
        row.insertCell(0).innerHTML = food.id;
        row.insertCell(1).innerHTML = food.nama;
        row.insertCell(2).innerHTML = food.harga;
        action = row.insertCell(3)
        action.setAttribute('class', 'text-end')
        action.appendChild(del)
        action.appendChild(edit)
    });
}
const getMenu = async (url) => {
    const response = await fetch(url);
    const data = await response.json().then(data => data.foods)
    return data;
}