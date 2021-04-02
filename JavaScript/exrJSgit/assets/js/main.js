/** Exercicio para criar uma lista de tarefas 
 * permitir apagar e add
 * mante-la salva
 * @bernardeslcs
 */

//Captura os elementos da pag
const container = document.querySelector('.container');
const btnAddTareda =  container.querySelector('.add-tarefa');
const inputTarefa = container.querySelector('.input-tarefa');
const tarefas = container.querySelector('.tarefas');

//escuta evento de click no botao add
btnAddTareda.addEventListener('click', function(){
  if(!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

//escuta evento de tecla pressionada no campo de entrada de texto
inputTarefa.addEventListener('keypress',function(event){
  if(event.keyCode === 13) { //Verifica cod da tecla press 13 p/ enter
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

//set vazio no campo de entrada de texto
function limpaInput(){
  inputTarefa.value='';
  inputTarefa.focus();
}

//
function criaTarefa(valueInput){
  const li = criaLi(); //Cria um elemento li na pag
  li.innerText = valueInput;  //insere o texto do input no li
  tarefas.appendChild(li); // li adicionado no objeto tarefas da pag
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}

//Cria o elemento li
function criaLi(){
  const li = document.createElement('li');
  return li;
}

//cria botão apagar para cada nova tarefa
function criaBotaoApagar(li){
  li.innerText +=' ';
  const botaoApagar = document.createElement('button');//criando botao
  botaoApagar.innerText = 'Apagar'; //texto do botao
  botaoApagar.setAttribute('class','apagar'); //declarando uma classe para o botao
  botaoApagar.setAttribute('title','Apagar esta tarefa'); // declarando um titulo para esse botao
  li.appendChild(botaoApagar); //add o botao ao li 
}

//escutando eventos da pag 
document.addEventListener('click',function(e){ //capturando evento click
  const el = e.target; //capturando a target do evento
  if(el.classList.contains('apagar')){ //checando se o target contain a class apagar
     el.parentElement.remove(); // deletendo o pai 'li' do elemento
     salvarTarefas();
  }
});


//salvando o estado dos objetos
function salvarTarefas(){
  const liTarefas = tarefas.querySelectorAll('li'); //pegando todos objetos 'li' do objeto tarefas
  const listaDeTarefas = []; // array pra salvar os abjetos

  for(let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText; //cada objeto li
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); //remov o txt apagar do btn 'trim' pra remover o espaco no final 
    listaDeTarefas.push(tarefaTexto);//salvando no array 
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas); //transf o array em string JSON para salvar 
  localStorage.setItem('tarefas', tarefasJSON); //salvando em localStorage do navegador a string JSON
}

//busca no localStorage a string salva e aloca novamente 
function adicionaTarefasSalvas(){
  const tarefas = localStorage.getItem('tarefas'); //pegando a string salva em localStorage
  const listaDeTarefas = JSON.parse(tarefas); //transformando a string em array 

  for(let tarefa of listaDeTarefas ){//percorrendo o array 
      criaTarefa(tarefa); // criando uma nova tarefa com cada item do array
  }
}
adicionaTarefasSalvas();














// function relogio(){
//   const relogio = document.querySelector('.relogio');
//   const iniciar = document.querySelector('.iniciar');
//   const pausar = document.querySelector('.pausar');
//   const zerar = document.querySelector('.zerar');
//   let segundos = 0;
//   let timer;


//   document.addEventListener('click', function(e){
//     const el = e.target;

//     if(el.classList.contains('zerar')){
//       relogio.classList.remove('pausado');
//       clearInterval(timer);
//       relogio.innerHTML = "00:00:00";
//       segundos = 0;
//     }

//     if(el.classList.contains('iniciar')){
//       relogio.classList.remove('pausado');
//       clearInterval(timer);
//       iniciaRelogio();
//     }

//     if(el.classList.contains('pausar')){
//       clearInterval(timer);
//       relogio.classList.add('pausado');
//     }
//   })


//   function criaDataDosSegundos(segundos){
//     const data = new Date(segundos*1000);
//     return data.toLocaleTimeString('pt-BR',{
//       hour12:false,
//       timeZone:'UTC'
//     });
//   }

//   function iniciaRelogio(){
//     timer = setInterval(function(){
//       segundos++;
//       relogio.innerHTML = criaDataDosSegundos(segundos);
//     },1000);
//   }
// }



// function meuEscopo(){
//   const paraf = document.querySelector('.paragrafos');
//   const meusParagrafos = paraf.querySelectorAll('p');
//   const estiloBody = getComputedStyle(document.body);
//   const backgroundColorBody = estiloBody.backgroundColor;
  
//   for(let p of meusParagrafos){
//     p.style.backgroundColor = backgroundColorBody;
//     p.style.color = '#FFFFFF'
//   }
// }
// meuEscopo();



// inserePag();

// function inserePag(){
//   for(let i=0;i<elements.length;i++){
//     const {tag,texto} = elements[i];
//     const tagCriada = document.createElement(tag);
//     tagCriada.innerText = texto;
//     div.appendChild(tagCriada);
//   }
// form.appendChild(div); 
// }



/*form.addEventListener('submit', function (e) {
  e.preventDefault();
  const inputPeso = e.target.querySelector('#peso');
  const inputAltura = e.target.querySelector('#altura');

  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  if (!peso) {
    setResultado('Peso inválido', false);
    return;
  }

  if (!altura) {
    setResultado('Altura inválida', false);
    return;
  }

  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);

  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  setResultado(msg, true);
});

function getNivelImc (imc) {
  const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
    'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}

function getImc (peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
}

function criaP () {
  const p = document.createElement('p');
  return p;
}

function setResultado (msg, isValid) {
  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = '';

  const p = criaP();

  if (isValid) {
    p.classList.add('paragrafo-resultado');
  } else {
    p.classList.add('bad');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
}*/
