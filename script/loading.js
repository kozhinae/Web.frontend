document.addEventListener('DOMContentLoaded', () => {
    const tableSection = document.querySelector('.table-section');
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.textContent = 'Загрузка...';
    tableSection.appendChild(preloader);

    const usersEndpoint = 'https://jsonplaceholder.typicode.com/users';
    let requestCount = parseInt(localStorage.getItem('requestCount'), 10) || 0;
    function fetchUsers() {
        requestCount++;
        localStorage.setItem('requestCount', requestCount);
        const filterUrl = requestCount % 2 === 0
            ? `${usersEndpoint}?id_gte=6`
            : `${usersEndpoint}?id_lte=5`;
        console.log(`Fetching data from: ${filterUrl}`);
        fetch(filterUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                preloader.style.display = 'none';
                renderUsers(data);
            })
            .catch((error) => {
                preloader.style.display = 'none';
                const errorBlock = document.createElement('div');
                errorBlock.className = 'error';
                errorBlock.textContent = `⚠ Что-то пошло не так: ${error.message}`;
                tableSection.appendChild(errorBlock);
            });
    }
    function renderUsers(users) {
        const tbody = document.querySelector('.responsive-table tbody');
        tbody.innerHTML = '';

        const template = document.createElement('template');
        template.innerHTML = `
            <tr>
                <td class="username"></td>
                <td class="name"></td>
                <td class="email"></td>
                <td class="address"></td>
                <td class="phone"></td>
                <td class="website"><a href="" target="_blank"></a></td>
                <td class="company"></td>
            </tr>
        `;

        users.forEach((user) => {
            const clone = template.content.cloneNode(true);
            const row = clone.querySelector('tr');

            row.querySelector('.username').textContent = user.username;
            row.querySelector('.name').textContent = user.name;
            row.querySelector('.email').textContent = user.email;
            row.querySelector('.address').textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
            row.querySelector('.phone').textContent = user.phone;
            const websiteLink = row.querySelector('.website a');
            websiteLink.href = `http://${user.website}`;
            websiteLink.textContent = user.website;
            row.querySelector('.company').textContent = user.company.name;

            tbody.appendChild(clone);
        });
    }
    fetchUsers();
});
