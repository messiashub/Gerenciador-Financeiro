



let $novaTrans = document.getElementById('novaTrans');
let $cancelar = document.getElementById('cancelar');
let $modal = document.querySelector('.modal-overlay')


const modal={
    /*funcão para abrir o modal Adiconar  a class active*/
    open : $novaTrans.addEventListener('click',()=>{
    $modal.classList.add("active");
    }),
    /* Função para fechar o modal  Remover a class active */
    close:$cancelar.addEventListener('click',()=>{
        $modal.classList.remove("active");
    })  
}
// Eu preciso somar as entradas
// depois eu preciso somar as Saidas e 
// remover das entradas o valor das saídas
// assim, eu terei o total


// Transações
const transactions = [
    {                  /* objeto */
        id:1, 
        description:"luz", 
        amount: -50001,       // amount= quantia
        date:"23/01/2021"
    },      
    {
        id:2, 
        description:"Criação de website", 
        amount: 500000,       // amount= quantia
        date:"23/01/2021"
    },
    {
        id:3, 
        description:"internet", 
        amount: -20013,       // amount= quantia
        date:"23/01/2021"
    },
    {
        id:4, 
        description:"App", 
        amount: 200000,       // amount= quantia
        date:"23/01/2021"
    }
]


const Transaction={//7.1
    income(){
        let income = 0;
        //pegar todas as transações
        // para cada transação,
        transactions.forEach((transaction)=>{
            //se ela for maior que zero
            if(transaction.amount > 0){
                // somar a uma variável e retornar a variavel
                income += transaction.amount;
            }
        })
        return income // somar entradas
    },

    expenses(){
         let expense = 0;
        //pegar todas as transações
        // para cada transação,
        transactions.forEach((transaction)=>{
            //se ela for menor que zero
            if(transaction.amount < 0){
                // somar a uma variável e retornar a variavel
                expense += transaction.amount;
            }
        })

        return expense  // somar saidas
    },
    total(){
        let total = Transaction.income() + Transaction.expenses(); //Obs: como os expenses ja possuem  sinal de - , + e -,é igual a -
        return  total// entradas - saídas
    }
}

// 1 Substituir os dados do HTML com os dados do JS
const DOM = { // 3 metodo vai adicionar
    transactionsContainer:document.querySelector('#data-table tbody'),


    addTransaction(transactions,index){  // 2  método vai criar o elemento html 'tr' que vai receber
                                        // o primeiro método e incorporar os elementos html 'tds"
                                        // recebendo "transaction como parametro"

       /*  console.log(transactions) */
        const tr = document = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transactions);
        /* console.log(tr.innerHTML); */
        DOM.transactionsContainer.appendChild(tr);
    },
    innerHTMLTransaction(transactions){ //  1 método vai criar "tds"  e vai ter como parametro
                                        // o  objeto "transactions e passar as suas propriedades"

        const CssClass = transactions.amount > 0 ? "income":"expense" //5 caso quantia seja maior que 0 recebe a classe 'income'

        const amount= Utils.formatCurrency(transactions.amount); // 6 formatando

        const html = `
        <td class="description">${transactions.description}</td> 
        <td class="${CssClass}">${amount}</td>
        <td class="date">${transactions.date}</td>
        <td><img src="./assets/minus.svg" alt="Remover transação"></td>
        
        `
        return html
    },
    updateBalance(){ // 7 Método para atualizar os campos "Entradas","Saídas" e "Total"
        document
            .getElementById("incomeDisplay")
            .innerHTML = Utils.formatCurrency(Transaction.income())  // Utils 6
        document
            .getElementById("expenseDisplay")
            .innerHTML = Utils.formatCurrency( Transaction.expenses()) // Utils 6
        document
            .getElementById("totalDisplay")
            .innerHTML = Utils.formatCurrency( Transaction.total()) // Utils 6

    }
}

const Utils = { // 6 formatando
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""  ; 

        value = String(value).replace(/\D/g,"");// Regex = tudo que não for numero, troque por nada, estudar regex
        /* value= Number(value)/100 */
        /* console.log(value); */
        /* console.log(typeof value); */

        value = Number(value)/100;
       /*  console.log(value);     */
        
        value= value.toLocaleString('pt-BR',{style:"currency",currency:"BRL"})
        return signal + value
    }
}

transactions.forEach(function(transaction){ //4  Para cada transação em transactions 
    DOM.addTransaction(transaction)
})

DOM.updateBalance()







/* Eu preciso pegar as minha transações do meu
   objeto aqui no javascript e colocar
   lá no HTML */


/*7.1 Transaction = pegar todas as transações
  se for maior que zero  somar a uma variável e retornar a variável */