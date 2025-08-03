var codeOutput = document.getElementById('imageholder');
var codeInput = document.getElementById('code');
var link = document.getElementById('linkholder');
var image = document.getElementById('github');
var body = document.querySelector('body');

var Editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode : "xml",
    theme:'3024-night',
    placeholder: 'Enter your code here...'
});

Editor.on('change', ()=>{codeOutput.innerHTML = Editor.getValue()} );

function generateLink(){
    if ( encodeURIComponent(window.btoa(Editor.getValue())) == "" ){
        createToast("warning","The svg content cannot be empty.");
        return
    }
    link.innerText = window.location.origin + "/svg?xml=" + encodeURIComponent(window.btoa(Editor.getValue()));
    createToast("success","");
};

function CopyLink(){
    navigator.clipboard.writeText(link.innerText);
}

function toggleTheme(){
    var isDark = body.getAttribute('data-bs-theme') == "light";
    Editor.setOption('theme',isDark ? "3024-night" : "3024-day");
    body.setAttribute('data-bs-theme',  isDark ? "dark" : "light");
    image.style.filter = isDark ? "invert(1)" : ""
}

function createToast(type, content){
    var template = document.createElement('div');
    template.setAttribute("class", `alert alert-${type} m-5`);
    template.innerHTML = `<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    <strong>${type}!</strong> ${content}`
    body.appendChild(template);
}