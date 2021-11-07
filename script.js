



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
        amount: -50000,       // amount= quantia
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
        amount: -20000,       // amount= quantia
        date:"23/01/2021"
    },
    {
        id:4, 
        description:"App", 
        amount: 200000,       // amount= quantia
        date:"23/01/2021"
    }
]


const Transaction={
    income(){
        // somar entradas
    },
    expenses(){
        // somar saidas
    },
    total(){
        // entradas - saídas
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
        const amount= Utils.formatCurrency(transactions.amount); // 6
        const html = `
        <td class="description">${transactions.description}</td> 
        <td class="${CssClass}">${transactions.amount}</td>
        <td class="date">${transactions.date}</td>
        <td><img src="./assets/minus.svg" alt="Remover transação"></td>
        
        `
        return html
    }
}

const Utils = { // 6
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "+"  ; 
        console.log(value);
        
    }
}

transactions.forEach(function(transaction){ //4  Para cada transação em transactions 
    DOM.addTransaction(transaction)
})








/* Eu preciso pegar as minha transações do meu
   objeto aqui no javascript e colocar
   lá no HTML */
 