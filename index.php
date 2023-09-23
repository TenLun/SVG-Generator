<?php
$str = $_GET["name"];
$colors = array("red","green","yellow","blue");
for ($i=0; $i<=strlen($str); $i++)
{
    $sel = $colors[rand(0,4)];
    $result = substr($str, $i, 1);
    echo "<a style='color:$sel'>$result</a>";
}
?>