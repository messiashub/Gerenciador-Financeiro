



let $novaTrans = document.getElementById('novaTrans');
let $cancelar = document.getElementById('cancelar');
let $modal = document.querySelector('.modal-overlay')


const modal={ 
    /*funcão para abrir o modal Adiconar  a class active*/
    open : $novaTrans.addEventListener('click',()=>{
    $modal.classList.add("active");
    }),
    /* Função para fechar o modal  Remover a class active */
    close:($cancelar.addEventListener('click',()=>{
        $modal.classList.remove("active");
    }))  
}
// Eu preciso somar as entradas
// depois eu preciso somar as Saidas e 
// remover das entradas o valor das saídas
// assim, eu terei o total




// 13- Guardando no LocalStorage
const Storage = {
    // a) pegar as informações do local storage
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
        console.log(localStorage)
    },

    // b) guardar as informações
    set(transactions){
        localStorage.setItem("dev.finances:transactions",JSON.stringify(transactions));
    },

}

// Transações
const Transaction={
    all:Storage.get(), // 13
    
    add(transaction){
        Transaction.all.push(transaction);

        App.reload()

       /*  console.log(Transaction.all) */
    },

    remove(index){  //11 pegar o index do array
        Transaction.all.splice(index,1);
        App.reload()

    },
    income(){
        let income = 0;
        //pegar todas as transações
        // para cada transação,
        Transaction.all.forEach((transaction)=>{
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
        Transaction.all.forEach((transaction)=>{
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
        tr.innerHTML = DOM.innerHTMLTransaction(transactions,index);//12 index
        tr.dataset.index = index; //12
        /* console.log(tr.innerHTML); */
        DOM.transactionsContainer.appendChild(tr);
    },
    innerHTMLTransaction(transactions,index){ //  1 método vai criar "tds"  e vai ter como parametro
                                        // o  objeto "transactions e passar as suas propriedades"

        const CssClass = transactions.amount > 0 ? "income":"expense" //5 caso quantia seja maior que 0 recebe a classe 'income'

        const amount= Utils.formatCurrency(transactions.amount); // 6 formatando

        const html = `
        <td class="description">${transactions.description}</td> 
        <td class="${CssClass}">${amount}</td>
        <td class="date">${transactions.date}</td>
        <td><img onclick="Transaction.remove (${index})" src="./assets/minus.svg" alt="Remover transação"></td>
        
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

    },
    clearTransactions(){ // 9  para  limpar depois de atualizar
        DOM.transactionsContainer.innerHTML="";

    }
}

const Utils = { // 6 formatando
    formatAmount(value){ // 11
        value = Number(value)*100 // transformando em  numero multiplicando

        return value;
       /*  console.log(value) */

    },

    formatDate(date){ //11
        const splitteDate = date.split("-");
        /* console.log(date)
        console.log(splitteDate); */
       
        return  `${splitteDate[2]}/${splitteDate[1]}/${splitteDate[0]}` 

    },


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

const Form = { 
    description:document.querySelector("input#description"),// 10 pegando os valores dos campos
    amount:document.querySelector("input#amount"),// 10
    date:document.querySelector("input#date"),//10

    getValues(){//10
        return {
            description:Form.description.value,
            amount:Form.amount.value,
            date:Form.date.value
        }
    },
  
    validadeFields(){ // 10  validando campos
        const {description,amount,date} = Form.getValues();

        if(description.trim() === "" || amount.trim()=== "" || date.trim()=== ""){
           throw new Error("Por favor preencha todos os campos.");
        }
        console.log(Form.getValues())
    },

    formatValues(){ // 11  formatando os  valores
        let {description,amount,date} = Form.getValues();
        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);
        
        return{
            description,
            amount,
            date
        }

    },

    saveTransaction(transaction){ //12
        Transaction.add(transaction)
    },
    clearFilds(){ // 13
        Form.description.value="";
        Form.amount.value="";
        Form.date.value="";
    },
    close(){ // 14
        $modal.classList.remove("active");

    },
    submit(event){ // 10
        /* console.log(event) */
        event.preventDefault();
         // 1 verificar se todas as informações forem preenchidas
        
        try{
            Form.validadeFields(); // 10
            // 2 formatar os dados para salvar 
            const transaction = Form.formatValues(); //11

            // salvar 
            Form.saveTransaction(transaction) //12

            // apagar os dados do formulario 
            Form.clearFilds()  // 13

            // fechar Modal // 14
            Form.close();

            
            // Atualizar a aplicação
        }catch(error){
            alert(error.message)

        }
        
    }
}

const App ={ //8
    init(){
        Transaction.all.forEach(function(transaction,index){ //8  Para cada transação em transactions 
            DOM.addTransaction(transaction, index) // 12

            Storage.set(Transaction.all) //13
        })
        
        DOM.updateBalance()
        
       /*  Transaction.add({
            id:39,
            description:"Alô",
            amount:200,  
            date:"08/11/2021"
        }) */
        

    },
    reload(){  //9 função para recarregar a pagina
        DOM.clearTransactions() // 9 chamando a função para limpar
        App.init()
    }
}




App.init();
/* Transaction.remove(0)
 */



/* transactions.forEach(function(transaction){ //4  Para cada transação em transactions 
    DOM.addTransaction(transaction)
})

DOM.updateBalance()
*/
/* Transaction.add({
   id:39, 
    description:"Alô",
    amount:200,  
    date:"08/11/2021"
})
  */




/* Eu preciso pegar as minha transações do meu
   objeto aqui no javascript e colocar
   lá no HTML */


/*7.1 Transaction = pegar todas as transações
  se for maior que zero  somar a uma variável e retornar a variável */


/* const Transaction={ 7.1
    all: [
        {                  
           
            description:"luz", 
            amount: -50001, 
            date:"23/01/2021"
        },      
        {
           
            description:"Criação de website", 
            amount: 500000,       
            date:"23/01/2021"
        },
        {
         
            description:"internet", 
            amount: -20013,       
            date:"23/01/2021"
        },
        {
           
            description:"App", 
            amount: 200000,       
            date:"23/01/2021"
        }
    ], */