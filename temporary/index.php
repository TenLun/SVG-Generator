<?php echo '<?xml version="1.0" encoding="iso-8859-1"?>';?>

<?php
    $str = $_GET["name"];
    header("Content-type: image/svg+xml");
?>

<svg width="310" height="140" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <path id="path1" d="M75,20 a1,1 0 0,0 100,0" />
    </defs>
    <text x="10" y="100" style="fill:red;">
        <textPath xlink:href="#path1"><?php echo $str ?></textPath>
    </text>
</svg>