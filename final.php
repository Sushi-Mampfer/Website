<?php
    if (!($_POST["passwd"] == "aekg")) {
        echo('<form action="final.php" method="post"><label for="passwd">Afangsbuechstabe vo de Lösige(4, chlibueschstabe): </label><input type="passwd" name="passwd" id="passwd"></form>');
        exit();
    } else {
        echo("Lueg nomol wo du agfange hesch ;)");
    }
?>