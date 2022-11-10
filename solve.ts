let groups: string[] = [
'X.X.X.X.X',
'(X.X).X.X.X',
'X.X.X.(X.X)',
'(X.X).X.(X.X)',
'(X.X.X).X.X',
'(X.X.X).(X.X)',
'(X.X).(X.X.X)',
'X.X.(X.X.X)',
'(X.(X.X)).(X.X)',
'(X.(X.X)).X.X',
'((X.X).X).(X.X)',
'((X.X).X).X.X',
'(X.X).(X.(X.X))',
'(X.X).((X.X).X)',
'(X.X.X).(X.X)'];

let operators: String = "+-/*";

let allCombinationsOfOperators: string[] = new Array();
let allCombinationsOfNumbers: string[] = new Array();

let allVariationsOfGroupsWithNumbers: string[] = new Array();

let allPossibleEquations: string[] = new Array();
let allValidEquations: string[] = new Array();

let baseNumbers: number[] = [2,4,8,16,32];

function swapNumbers(index1: number, index2: number)
{
	let tempNumber: number = baseNumbers[index1];

	baseNumbers[index1] = baseNumbers[index2];
	baseNumbers[index2] = tempNumber;
}

function getAsciiCode(value: number): number
{
	switch(value)
	{
		case 2:
			return (97);
		case 4:
			return (98);
		case 8:
			return (99);
		case 16:
			return (100);
		case 32:
			return (101);
		}
	return (0);
}

function getNumberValue(char: string): string
{
	switch(char)
	{
		case 'a':
			return ('2');
		case 'b':
			return ('4');
		case 'c':
			return ('8');
		case 'd':
			return ('16');
		case 'e':
			return ('32');
	}
	return ('0');
}

function createAllNumberCombinations(start: number, end: number): void
{
	if (start === end)
	{
		let newString: string = String.fromCharCode(getAsciiCode(baseNumbers[0])) +
								String.fromCharCode(getAsciiCode(baseNumbers[1])) +
								String.fromCharCode(getAsciiCode(baseNumbers[2])) +
								String.fromCharCode(getAsciiCode(baseNumbers[3])) +
								String.fromCharCode(getAsciiCode(baseNumbers[4]));
		allCombinationsOfNumbers.push(newString);
	}
	else
	{
		let i: number = start;

		for (; i <= end; i++)
		{
		
			swapNumbers(start, i);
			createAllNumberCombinations(start + 1, end);
			swapNumbers(start, i);
		}
	}
}

function createGroupsWithNumbers(): void
{
	for (let groupIndex: number = 0 ; groupIndex < groups.length; groupIndex++)
	{
		for (let numbersIndex: number = 0; numbersIndex < allCombinationsOfNumbers.length; numbersIndex++)
		{
			let groupArray: string[] = groups[groupIndex].split('');
			let groupArrayIndex: number = 0;

			for (let numberStringIndex: number = 0; numberStringIndex < allCombinationsOfNumbers[numbersIndex].length; numberStringIndex++)
			{
				while (groupArrayIndex < groups[groupArrayIndex].length && groupArray[groupArrayIndex] != 'X')
					groupArrayIndex++;
				if (groupArrayIndex >= groups[groupArrayIndex].length)
					break;
				groupArray[groupArrayIndex] = getNumberValue(allCombinationsOfNumbers[numbersIndex][numberStringIndex]);
			}
			allVariationsOfGroupsWithNumbers.push(groupArray.join(""));
		}
	}
}


function createAllOperatorCombinationsRecur(str: String, data, last: number, index: number): void
{
	let length: number = str.length;

	for( let i: number = 0; i < length; i++)
	{
		if (str[i] != ',')
			data[index] = str[i];

		if (index === last)
			allCombinationsOfOperators.push(data.join(""));
		else
			createAllOperatorCombinationsRecur(str, data, last , index + 1);
	}
}

function createAllOperatorCombinations(str: String): void
{
	let length: number = str.length;
	let data = new Array(length + 1);
	let temp = str.split("");

	temp.sort();
	str = new String(temp);
	createAllOperatorCombinationsRecur(str, data, length -1 , 0);

}

function createAllCompleteEquations(): void
{
	for (let groupIndex: number = 0; groupIndex < allVariationsOfGroupsWithNumbers.length; groupIndex++)
	{
		for (let operatorGroupIndex: number = 0; operatorGroupIndex < allCombinationsOfOperators.length; operatorGroupIndex++)
		{
			let stringArray = allVariationsOfGroupsWithNumbers[groupIndex].split("");
			let stringArrayIndex: number = 0;

			for (let operatorIndex: number = 0; operatorIndex < allCombinationsOfOperators[operatorGroupIndex].length; operatorIndex++)
			{
				while (stringArrayIndex < stringArray.length && stringArray[stringArrayIndex] != '.')
					stringArrayIndex++;
				if (stringArrayIndex >= stringArray.length)
						break;
				if (stringArray[stringArrayIndex] == '.')
					stringArray[stringArrayIndex] = allCombinationsOfOperators[operatorGroupIndex][operatorIndex];
				stringArrayIndex++;
			}
			allPossibleEquations.push(stringArray.join(""));
		}
	}
}

function checkWithoutBrackets(str: String): Boolean
{
	let returnValue: Boolean = false;

	for (let equationIndex: number = 0; equationIndex < allValidEquations.length; equationIndex++)
	{
		let tempString = allValidEquations[equationIndex];
		while(tempString.indexOf("(") != - 1)
			tempString = tempString.replace("(", "");
		while(tempString.indexOf(")") != - 1)
			tempString = tempString.replace(")", "");
		if (str === tempString)
			returnValue = true;
	}
	return (returnValue);
}

createAllNumberCombinations(0, 4);
createGroupsWithNumbers();
createAllOperatorCombinations(operators);
createAllCompleteEquations();

for (let i: number = 0; i < allPossibleEquations.length; i++)
{
	if (eval(allPossibleEquations[i]) === eval('11') && allValidEquations.indexOf(allPossibleEquations[i]) == -1 && checkWithoutBrackets(allPossibleEquations[i]) == false)
		allValidEquations.push(allPossibleEquations[i]);
}

console.dir(allValidEquations, {'maxArrayLength': null});