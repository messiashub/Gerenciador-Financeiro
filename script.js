



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
const DOM = {
    addTransaction(transactions,index){  // 2  método vai criar o elemento html 'tr' que vai receber
                                        // o primeiro método e incorporar os elementos html 'tds"
                                        // recebendo "transaction como parametro"

        console.log(transactions)
        const tr = document = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transactions);

        console.log(tr.innerHTML)
    },
    innerHTMLTransaction(transactions){ //  1 método vai criar "tds"  e vai ter como parametro
                                        // o  objeto "transactions e passar as suas propriedades"
        const html = `
        <td class="description">${transactions.description}</td> 
        <td class="expense">${transactions.amount}</td>
        <td class="date">${transactions.date}</td>
        <td><img src="./assets/minus.svg" alt="Remover transação"></td>
        
        `
        return html
    }
}
DOM.addTransaction(transactions[2]);








/* Eu preciso pegar as minha transações do meu
   objeto aqui no javascript e colocar
   lá no HTML */
 