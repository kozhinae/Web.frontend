document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('award-form');
    const tableContainer = document.getElementById('table-container');
    const saveButton = document.getElementById('save');
    const loadButton = document.getElementById('load');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const rows = parseInt(form.rows.value);
        const columns = parseInt(form.columns.value);
        const language = form.language.value;
        const maxAwards = parseInt(form['max-awards'].value);

        generateTable(rows, columns, language, maxAwards);
    });

    saveButton.addEventListener('click', () => {
        const params = {
            rows: form.rows.value,
            columns: form.columns.value,
            language: form.language.value,
            maxAwards: form['max-awards'].value,
        };
        localStorage.setItem('awardConstructorParams', JSON.stringify(params));
        alert('Параметры сохранены!');
    });

    loadButton.addEventListener('click', () => {
        const savedParams = localStorage.getItem('awardConstructorParams');
        if (savedParams) {
            const params = JSON.parse(savedParams);
            form.rows.value = params.rows;
            form.columns.value = params.columns;
            form.language.value = params.language;
            form['max-awards'].value = params.maxAwards;
            alert('Параметры загружены!');
        } else {
            alert('Нет сохранённых параметров.');
        }
    });

    function generateTable(rows, columns, language, maxAwards) {
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('generated-table');

        for (let i = 0; i < rows; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < columns; j++) {
                const td = document.createElement('td');

                if (j === 0) {
                    const awardNumber = i + 1;
                    if (awardNumber <= maxAwards) {
                        td.innerHTML = `<input type="text" placeholder="${language === 'ru' ? 'Награда' : 'Award'} ${awardNumber}">`;
                    }
                } else {
                    td.innerHTML = '<input type="text" placeholder="Введите данные">';
                }

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        tableContainer.appendChild(table);
    }
});
