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
            tableData: getTableData(),
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

            generateTable(
                parseInt(params.rows),
                parseInt(params.columns),
                params.language,
                parseInt(params.maxAwards),
                params.tableData
            );
            alert('Параметры загружены!');
        } else {
            alert('Нет сохранённых параметров.');
        }
    });

    function generateTable(rows, columns, language, maxAwards, tableData = []) {
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('generated-table');

        for (let i = 0; i < rows; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < columns; j++) {
                const td = document.createElement('td');
                const cellData =
                    tableData[i] && tableData[i][j] ? tableData[i][j] : '';

                if (j === 0) {
                    const awardNumber = i + 1;
                    if (awardNumber <= maxAwards) {
                        td.innerHTML = `<input type="text" value="${cellData}" placeholder="${
                            language === 'ru' ? 'Награда' : 'Award'
                        } ${awardNumber}">`;
                    }
                } else {
                    td.innerHTML = `<input type="text" value="${cellData}" placeholder="Введите данные">`;
                }

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        tableContainer.appendChild(table);
    }

    function getTableData() {
        const table = document.querySelector('.generated-table');
        if (!table) return [];
        const rows = [];
        table.querySelectorAll('tr').forEach((tr) => {
            const row = [];
            tr.querySelectorAll('input').forEach((input) => {
                row.push(input.value);
            });
            rows.push(row);
        });
        return rows;
    }
});
