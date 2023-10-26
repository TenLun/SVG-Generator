const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
input = urlParams.get('name');
options = urlParams.get('opt') || null;

//画表
function RenderChart (datas,label,colors) {
    const ctx = document.getElementById('myChart');
    const data = {
        labels: label,
        datasets: [{
            label: '环形图实例',
            data: datas,
            backgroundColor: colors,
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true, // 设置图表为响应式，根据屏幕窗口变化而变化
            maintainAspectRatio: false,// 保持图表原有比例
        }
    };
    const myChart = new Chart(ctx, config);
}

function ObjToList(obj,pos){
    var list = [];
    for (i in obj) {
        if (pos) list.push(obj[i]);
        else list.push(i);
    }
    return list
}

async function fetchUser(username) {

    var languages = {}
    colors = []

    await fetch('https://api.github.com/users/' + username + '/repos')
        .then( response => response.json() )
        .then( data => json_data = data);

    //将获取到的数据添加
    for ( i in json_data ) {

        var repo = json_data[i]['full_name']

        await fetch('https://api.github.com/repos/' + repo + '/languages')
            .then( response => response.json() )
            .then( data => lan_data = data);

        //遍历语言
        for ( lang in lan_data ) {
            //不存在则赋值
            if (!(languages[lang] += lan_data[lang])) {
                languages[lang] = lan_data[lang];
                colors.push(language_colors[lang]['color']);
            }
        }

    }

    datas = ObjToList(languages,1);
    labels = ObjToList(languages,0);

    RenderChart(datas,labels,colors);
}
fetchUser(input);



