# Using your knowledge of C#, C++ and VB.NET with Screeps

This tutorial will cover:

Basic C++/C#/VB.NET programming to javascript

Differences between the languages you need to know


As the languages are similar, this tutorial will cover all 3
This tutorial may also cover similar languages but is explicitly aimed at C#, C++ and VB.NET

#Basics:

## Conditions, loops and more...

In VB you would use this for IF, ElseIF and Else statements:

```Vbnet
If CONDITION Then
	'Put your code here
ElseIf CONDITION Then
	'Put your code here
Else
	'Put your code here
End If
```
C#/C++ code for this is exactaly the same as the javascript:
```javascript
if (CONDITION) 
{
	//Put your code here
}
else if (CONDITION)
{
	//Put your code here
}
else
{
	//Put your code here
}
```

C#/C++ is very simlar to javascript for more things like FOR loops and WHILE loops,
and by very simlar, I mean exactaly the same.

Here are some examples

### FOR

VB:
```Vbnet
For i = 0 to 9
	'Put your code here
Next
```
C#/C++/Javascript
```javascript
for (i = 0; i = 9; i++) { 
    //Put your code here
}
```
### While

VB:
```Vbnet
While CONDITION
	'Put your code here
End While
```
C#/C++/Javascript
```javascript
While (CONDITION) {
	//Put your code here
}
```

### Referencing other code

Say you have two files
```
Main
```
and
```
CodeToUseInMain
```

and you want to reference the second file in the first

in VB you would use something like:

```Vbnet
Imports CodeToUseInMain
'more code from main up here ^^^

CodeToUseInMain.Function1(param1,param2)

'more code from main down here vvv
```

However, this is where C++/C# differ from javascript
```Vbnet
Imports CodeToUseInMain
'more code from main up here ^^^

CodeToUseInMain.Function1(param1,param2);

'more code from main down here vvv
```
Now, say I want to reference the a method from inside the second file in javascript
I would do this:

```Javascript
// in the top of the Main file
var CodeToUse = require('CodeToUseInMain')
// at where I want to use the function
CodeToUse.Function1(param1,param2);
```
