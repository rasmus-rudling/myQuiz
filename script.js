class Quiz
	{
		constructor(question, ans1, ans2, ans3)
			{
				this.question = question;
				this.ans1 = ans1;
				this.ans2 = ans2;
				this.ans3 = ans3;
			}
	}

class Answer
	{
		constructor(answer, correct, selected=false)
			{
				this.answer = answer;
				this.correct = correct;
				this.selected = selected;
			}
	}

function main()
	{
		currentQuestNum = 0;
		checkCurrentQuestNum = true;

		const ans1_1 = new Answer("String", true);
		const ans2_1 = new Answer("Integer", false);
		const ans3_1 = new Answer("Float", false);
		const quest1 = new Quiz('Vad har "3.0" för datatyp?', ans1_1, ans2_1, ans3_1);

		const ans1_2 = new Answer("for(i++, i < 6; i = 0) {}", false);
		const ans2_2 = new Answer("for(i+=1; 6 < i) {}", false);
		const ans3_2 = new Answer("for(i = 0; i < 6; i++) {}", true);
		const quest2 = new Quiz('Hur skapar man en for-loop?', ans1_2, ans2_2, ans3_2);

		const ans1_3 = new Answer('var lista = {"Blue", "Gray"}', false);
		const ans2_3 = new Answer('var lista = ["Blue", "Gray"]', true);
		const ans3_3 = new Answer('var lista = ("Blue", "Gray")', false);
		const quest3 = new Quiz('Vilken av dessa är en lista/array?', ans1_3, ans2_3, ans3_3);

		quizList =
			[
				[quest1, ans1_1, ans2_1, ans3_1],
				[quest2, ans1_2, ans2_2, ans3_2],
				[quest3, ans1_3, ans2_3, ans3_3]
			];

			mouseEventFunc("svar-ruta-1", "mouseover", musIn);
			mouseEventFunc("svar-ruta-1", "mouseout", musUt);
			mouseEventFunc("svar-ruta-2", "mouseover", musIn);
			mouseEventFunc("svar-ruta-2", "mouseout", musUt);
			mouseEventFunc("svar-ruta-3", "mouseover", musIn);
			mouseEventFunc("svar-ruta-3", "mouseout", musUt);

			// --- KLICK ---
			aktiveraVal("svar-ruta-1", "svar-ruta-2", "svar-ruta-3");
			aktiveraVal("svar-ruta-2", "svar-ruta-1", "svar-ruta-3");
			aktiveraVal("svar-ruta-3", "svar-ruta-2", "svar-ruta-1");

			setInterval(
				function()
					{
						if (checkCurrentQuestNum == true)
							{
								currentQuestNum = parseInt((document.getElementById("questCount").innerHTML).slice(1,));
							}

					}, 50);
	}

function createQuiz(num)
	{
		document.getElementById("question").innerHTML = quizList[num][0].question;
		document.getElementById("questCount").innerHTML = "#" + (num+1).toString();
		document.getElementById("svar-ruta-1").innerHTML = quizList[num][1].answer;
		document.getElementById("svar-ruta-2").innerHTML = quizList[num][2].answer;
		document.getElementById("svar-ruta-3").innerHTML = quizList[num][3].answer;
	}

function nextQuest()
	{
		progress = ((currentQuestNum + 1) / quizList.length)*100;
		console.log(currentQuestNum);


		if (quizList[currentQuestNum-1][1].selected == false && quizList[currentQuestNum-1][2].selected == false && quizList[currentQuestNum-1][3].selected == false)
			{
				$("#must-choose").modal("toggle");
			}

		else if (currentQuestNum == quizList.length-1)
			{
				// När vi är på sista frågan vill vi att knappen ska ändras från "Nästa" till "Rätta"
				document.getElementById("btn-next-inner").className = "btn btn-success btn-lg";
				document.getElementById("btn-next-inner").innerHTML = "Rätta";

				// Ändrar tillbaka alla bakgrundsfärger när vi byter fråga
				document.getElementById("svar-ruta-1").style.backgroundColor = "#f0f0f0";
				document.getElementById("svar-ruta-1").style.color = "#232323";

				document.getElementById("svar-ruta-2").style.backgroundColor = "#f0f0f0";
				document.getElementById("svar-ruta-2").style.color = "#232323";

				document.getElementById("svar-ruta-3").style.backgroundColor = "#f0f0f0";
				document.getElementById("svar-ruta-3").style.color = "#232323";

				document.getElementById("progress-bar-counter").style.width = progress + "%";
				document.getElementById("progress-bar-counter").innerHTML = "Fråga " + (currentQuestNum + 1) + " av " + quizList.length;

				createQuiz(currentQuestNum);
			}

		else if (currentQuestNum < quizList.length)
			{
				// Ändrar tillbaka alla bakgrundsfärger när vi byter fråga
				document.getElementById("svar-ruta-1").style.backgroundColor = "#f0f0f0";
				document.getElementById("svar-ruta-1").style.color = "#232323";

				document.getElementById("svar-ruta-2").style.backgroundColor = "#f0f0f0";
				document.getElementById("svar-ruta-2").style.color = "#232323";

				document.getElementById("svar-ruta-3").style.backgroundColor = "#f0f0f0";

				document.getElementById("svar-ruta-3").style.color = "#232323";

				document.getElementById("progress-bar-counter").style.width = progress + "%";
				document.getElementById("progress-bar-counter").innerHTML = "Fråga " + (currentQuestNum + 1) + " av " + quizList.length;

				createQuiz(currentQuestNum);
			}

		else if (currentQuestNum == quizList.length)
			{
				document.getElementById("progress-bar-counter").innerHTML = "";
				document.getElementById("progress-bar-counter").className = "progress-bar progress-bar-striped progress-bar-animated bg-success";

				document.getElementById("btn-next").onclick = function() {checkAnswers()};
			}
	}

// --- MUS IN ---
function musIn(id)
	{
		var currentBox = parseInt(id.slice(10,11));

		console.log(currentQuestNum);

		if (quizList[currentQuestNum-1][currentBox].selected == false)
			{
				document.getElementById(id).style.backgroundColor = "#e0e0e0";
			}
	}

// --- MUS UT ---
function musUt(id)
	{
		var currentBox = parseInt(id.slice(10,11));

		if (quizList[currentQuestNum-1][currentBox].selected == false)
			{
				document.getElementById(id).style.backgroundColor = "#f0f0f0";
			}
	}

function mouseEventFunc(id, event, mouseFunc)
	{
		document.getElementById(id).addEventListener(event,
		function()
			{
				mouseFunc(id);
			});
	}

function aktiveraVal(id_vald, id_inte_vald_1, id_inte_vald_2)
	{
		document.getElementById(id_vald).addEventListener("click",
		function()
			{
				// Tar reda på vilket box-nummer vi har med hjälp av ID-namnet
				var chosenBox = parseInt(id_vald.slice(10,11));
				var notChosenBox1 = parseInt(id_inte_vald_1.slice(10,11));
				var notChosenBox2 = parseInt(id_inte_vald_2.slice(10,11));

				// Ändrar fontfärg och textfärg för den valda boxen
				// Aktiverar även knappen och säger att denna nu är vald
				document.getElementById(id_vald).style.backgroundColor = "#232323";
				document.getElementById(id_vald).style.color = "#f0f0f0";
				quizList[currentQuestNum-1][chosenBox].selected = true;


				// Ändrar tillbaka fontfärg och textfärg för de två andra boxarna som inte är valda
				// Vi avaktiverar även dessa två ifall att någon av dem är valda sedan tidigare
				document.getElementById(id_inte_vald_1).style.backgroundColor = "#f0f0f0";
				document.getElementById(id_inte_vald_1).style.color = "#232323";
				quizList[currentQuestNum-1][notChosenBox1].selected = false;

				document.getElementById(id_inte_vald_2).style.backgroundColor = "#f0f0f0";
				document.getElementById(id_inte_vald_2).style.color = "#232323";
				quizList[currentQuestNum-1][notChosenBox2].selected = false;
			});
	}

function checkAnswers()
	{
		if (quizList[currentQuestNum-1][1].selected == false && quizList[currentQuestNum-1][2].selected == false && quizList[currentQuestNum-1][3].selected == false)
			{
				alert("Du måste välja ett alternativ för att kunna rätta dina svar!")
			}

		else
			{
				checkCurrentQuestNum = false;
				var correctCount = 0;
				var questionAmount = quizList.length;
				var perfComment;

				for(var i = 0; i < quizList.length; i++)
					{
						for(var j = 1; j < 4; j++)
							{
								if(quizList[i][j].correct == true && quizList[i][j].selected == true)
									{
										correctCount++;
									}
							}
					}

				var correctRatio = parseFloat(correctCount)/parseFloat(questionAmount);

				if (correctRatio < 0.125)
					{
						perfComment = "du har verkligen dålig koll :/"
					}

				else if (correctRatio >= 0.125 && correctRatio < 0.25)
					{
						perfComment = "det där lyckades du inte superbra med! :/"
					}

				else if (correctRatio >= 0.25 && correctRatio < 0.5)
					{
						perfComment = "bättre lycka nästa gång!"
					}

				else if (correctRatio >= 0.5 && correctRatio < 0.75)
					{
						perfComment = "nästan godkänt!"
					}

				else if (correctRatio >= 0.75 && correctRatio < 1)
					{
						perfComment = "mycket väl godkänt!"
					}

				else {
					{
						perfComment = "ALLA RÄTT - WOW!"
					}
				}

				var endHTML = `
					<div class="row">
						<div class="col-12">
							<h3 id="greeting">Kul att du ville spela!</h3>
						</div>

					</div>

					<div class="row">
						<div class="col-12">
							<p id="summary">Du fick ${correctCount} av ${questionAmount} rätt, ${perfComment}</p>
						</div>
					</div>

					<div class="row">
						<div class="col-12" id="btn-next">
							<button type="button" class="btn btn-primary btn-lg" onclick="startQuiz()">Starta om</button>
						</div>
					</div>`;

				document.getElementById("quiz-box").innerHTML = endHTML;
			}


	}

function startQuiz()
	{
		checkCurrentQuestNum = true;

		var startHTML = `
			<div class="row" id="fragor">
				<div class="col-2">

				</div>

				<div class="col-8">
					<h3 id="question">${quizList[0][0].question}</h3>
				</div>

				<div class="col-2">
					<h3 id="questCount">#1</h3>
				</div>
			</div>

			<div class="row">
					<div class="col-4" id="svar-ruta-1">
						${quizList[0][1].answer}
					</div>

				<div class="col-4" id="svar-ruta-2">
					${quizList[0][2].answer}
				</div>

				<div class="col-4" id="svar-ruta-3">
					${quizList[0][3].answer}
				</div>
			</div>

			<div class="row">
				<div class="col-12" id="btn-next">
					<button type="button" class="btn btn-primary btn-lg" id="btn-next-inner" onclick="nextQuest()">Nästa</button>
				</div>
			</div>
		`

		for(var i = 0; i < quizList.length; i++)
			{
				for(var j = 1; j < 4; j++)
					{
						quizList[i][j].selected = false;
						console.log(quizList[i][j].selected);
					}
			}

		document.getElementById("quiz-box").innerHTML = startHTML;

		document.getElementById("progress-bar-counter").className = "progress-bar";
		document.getElementById("progress-bar-counter").style.width = ((1/quizList.length)*100) + "%";
		document.getElementById("progress-bar-counter").innerHTML = "Fråga 1 av " + quizList.length;

		main();
	}

main();

console.log("Hej dä igen!!!!!!!!!");