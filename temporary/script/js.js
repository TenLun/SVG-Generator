//即将迁移到Pizza Pie Charts

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
input = urlParams.get('name');
options = urlParams.get('opt') || null;

//画表并提取svg
function RenderChart (datas,colors) {
    var myChart = echarts.init(document.getElementById('myChart'), null, {renderer: 'svg'});
 
    myChart.setOption({
        color: colors,
        series : [
            {
                name: '访问来源',
                type: 'pie',    // 设置图表类型为饼图
                radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                data:datas          // 数据数组，name 为数据项名称，value 为数据项值
            }
        ]
    })

    div2svg();
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

    //数值
    datas = [];

    for (i in languages) {
        datas.push({value:languages[i], name:i})
    }

    RenderChart(datas,colors);
}

fetchUser(input);

function div2svg() {
    //delete <defs>
    var Content = document.getElementsByTagName("defs")[0];
    Content.parentNode.removeChild(Content);

    var Content = document.getElementsByTagName("svg")[0].innerHTML;

    var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>" +
        Content +
        "</svg>";

    document.body.innerHTML = svg;
}


