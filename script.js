/*funcão para abrir o modal
  Adiconar  a class active*/

/* Função para fechar o modal
    Remover a class active */

let $novaTrans = document.getElementById('novaTrans');
let $cancelar = document.getElementById('cancelar');
let $modal = document.querySelector('.modal-overlay')





const modal={
    open : $novaTrans.addEventListener('click',()=>{
    $modal.classList.add("active");
    }),

    close:$cancelar.addEventListener('click',()=>{
        $modal.classList.remove("active");
    })
    
    
    
}