var codeInput = document.getElementById('code');
var codeOutput = document.getElementById('imageholder');
var link = document.getElementById('linkholder');
var body = document.querySelector('body');
var Editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode : "xml",
    lineNumbers:true,
    theme:'3024-night',
    placeholder: 'Enter your code here...'
});

Editor.on('change', ()=>{codeOutput.innerHTML = Editor.getValue()} );

function generateLink(){
    link.innerText = window.location.origin + "/svg?xml=" + encodeURIComponent(window.btoa(Editor.getValue()));
};

function toggleTheme(){
    var isDark = body.getAttribute('data-bs-theme') == "light"
    Editor.setOption('theme',isDark ? "3024-night" : "3024-day")
    body.setAttribute('data-bs-theme',  isDark ? "dark" : "light");
}