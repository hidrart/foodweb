document.addEventListener('DOMContentLoaded', function(event) {
    updateFood();
    addFood();
});
const readData = async () => {
    const url = 'http://127.0.0.1:3000/foods/';
    const data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(response => response.json()).then(data => data).catch(console.log);
    return data
}
const getData = async (id) => {
    const url = 'http://127.0.0.1:3000/foods/'
    const data = await fetch(url + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(response => response.json()).then(data => data).catch(console.log);
    return data
}
const putData = async (id, data) => {
    const url = 'http://127.0.0.1:3000/foods/';
    await fetch(url + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}
const createData = async (data) => {
    const url = 'http://127.0.0.1:3000/foods/';
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}
const deleteData = async (id) => {
    const url = 'http://127.0.0.1:3000/foods/';
    const response = await fetch(url + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });
}
const createAlert = (message, alerttype) => {
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
const addFood = async () => {
    const form = document.getElementById('foodForm');
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
            var data = readData();
            var food = {
                id: data.length + 1,
                nama: form.elements['nama'].value,
                harga: form.elements['harga'].value,
            };
            createData(food);
            updateFood();
            createAlert("Data berhasil ditambahkan", "alert-success");
            form.reset();
            form.classList.remove('was-validated');
        }
    }, false)
}
const deleteFood = async (id) => {
    deleteData(id);
    var data = await getData(id);
    createAlert(`Data ${data.nama} berhasil di hapus`, "alert-warning");
}
const editFood = async (id) => {
    var data = await getData(id);
    console.log(data);
    const form = document.getElementById('editFoodForm');
    form.querySelector('#nama').setAttribute('value', `${data.nama}`);
    form.querySelector('#harga').setAttribute('value', `${data.harga}`);
    form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated');
            createAlert("Data gagal di ubah", "alert-danger");
            setTimeout(function() {
                form.classList.remove('was-validated');
            }, 3000);
        } else {
            var food = {
                id: data.id,
                nama: form.elements['nama'].value,
                harga: form.elements['harga'].value,
            };
            putData(data.id, food);
            updateFood();
            createAlert("Data berhasil diubah", "alert-success");
            form.reset();
            form.classList.remove('was-validated');
        }
    }, false);
}
const updateFood = async () => {
    var data = await readData();
    var table = document.getElementById('foodTable').querySelector('tbody');
    table.innerHTML = '';
    var counter = 1
    data.forEach(food => {
        var row = table.insertRow(-1);
        row.insertCell(0).innerHTML = counter;
        row.insertCell(1).innerHTML = food.nama;
        row.insertCell(2).innerHTML = food.harga;
        // create delete button
        var del = document.createElement('button');
        del.setAttribute('class', 'btn btn-sm btn-outline-danger ms-3');
        del.setAttribute('onClick', `deleteFood(${food.id})`);
        del.innerHTML = '<i class="far fa-trash-alt"></i>';
        // create edit button
        var edit = document.createElement('button')
        edit.setAttribute('class', 'btn btn-sm btn-outline-dark ms-3')
        edit.setAttribute('data-bs-toggle', 'collapse')
        edit.setAttribute('data-bs-target', '#editFoodForm')
        edit.setAttribute('aria-expanded', 'false')
        edit.setAttribute('aria-controls', 'editFoodForm')
        edit.setAttribute('onClick', `editFood(${food.id})`);
        edit.innerHTML = '<i class="fas fa-edit"></i>';
        // append button to action column
        action = row.insertCell(3)
        action.setAttribute('class', 'text-end')
        action.appendChild(del)
        action.appendChild(edit)
        counter++;
    })
}