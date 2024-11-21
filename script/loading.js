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
        const existingTable = document.querySelector('.responsive-table');
        if (existingTable) existingTable.remove();
        const table = document.createElement('table');
        table.className = 'responsive-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Имя пользователя</th>
                    <th>Полное имя</th>
                    <th>Email</th>
                    <th>Адрес</th>
                    <th>Телефон</th>
                    <th>Веб-сайт</th>
                    <th>Компания</th>
                </tr>
            </thead>
            <tbody>
                ${users
            .map(
                (user) => `
                    <tr>
                        <td>${user.username}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>
                            ${user.address.street}, ${user.address.suite}, 
                            ${user.address.city}, ${user.address.zipcode}
                        </td>
                        <td>${user.phone}</td>
                        <td><a href="http://${user.website}" target="_blank">${user.website}</a></td>
                        <td>${user.company.name}</td>
                    </tr>`
            )
            .join('')}
            </tbody>
        `;
        tableSection.appendChild(table);
    }

    fetchUsers();
});
