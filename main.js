const display = document.getElementById("display")
const tailwindString = "border-2 p-1 pl-2 rounded-sm hover:bg-gray-100 mb-3"
const tailwindNext = "w-12 p-1 text-white bg-blue-700 rounded-sm"
const questionElement = document.getElementById("question")

const nextBtn = document.getElementById("nextBtn")
const buttonDivElement = document.getElementById("buttonDiv")

const questions = [
    {
        question: "What is the largest mammal on Earth?",
        answers: [
            {text: "Elephant", correct : false},
            {text: "Blue whale", correct : false},
            {text: "Fin whale", correct : true},
            {text: "Hippopotamus", correct : false},
        ]
    },
    {
        question: "Which planet in our solar system has the highest average temperature?",
        answers: [
            {text: "Mercury", correct : false},
            {text: "Venus", correct : true},
            {text: "Mars", correct : false},
            {text: "Jupiter", correct : false},
        ]
    },
    {
        question: `Who painted the famous painting "The Scream"?`,
        answers: [
            {text: "Edvard Munch", correct : true},
            {text: "Vincent van Gogh", correct : false},
            {text: "Pablo Picasso", correct : false},
            {text: "Claude Monet", correct : false},
        ]
    },
    {
        question: "What is the largest living structure on Earth?",
        answers: [
            {text: "The Great Barrier Reef", correct : false},
            {text: "The Amazon Rainforest", correct : true},
            {text: "The Grand Canyon", correct : false},
            {text: "The Great Wall of China", correct : false},
        ]
    }
]


let currentQuestionIndex = 0
let score = 0

const startQuiz = ()=>{
    currentQuestionIndex = 0
    score = 0
    
    showQuestion()
}

const showQuestion = ()=>{

    resetState()

    const currentQuestion = questions[currentQuestionIndex]
    const questionNo = currentQuestionIndex + 1

    if( questionNo > questions.length){
        resetState()
        questionElement.innerHTML = ""
        display.innerHTML = `You got ${score} out of 4`
       
    } else {
        questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`

        currentQuestion.answers.forEach((ans)=>{
        const button = document.createElement("button")
        button.innerHTML = ans.text
        button.classList.add("customBtn")
        display.appendChild(button)
        if(ans.correct){
            button.dataset.correct = ans.correct
        }
        button.addEventListener("click", selectAnswer)
        
    })
    }

    

}

const resetState = ()=>{
    nextBtn.style.display = "none"
    while(display.firstChild){
        display.removeChild(display.firstChild)
    }
    display.innerHTML = ""
}

const selectAnswer = (e)=>{
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect){
        selectedBtn.classList.add("correct")
        score++
        console.log("score = " , score)
    } else {
        selectedBtn.classList.add("incorrect")
    }

    Array.from(display.children).forEach(button=> {
        if (button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })

    nextBtn.style.display = "block"
}

const nextQuestion = () =>{
    currentQuestionIndex++
    showQuestion()
}

nextBtn.addEventListener("click", nextQuestion)

startQuiz()