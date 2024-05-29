<?php
    if (!($_POST["passwd"] == "aekb")) {
        echo('<form action="final.php" method="post"><label for="passwd">Afangsbuechstabe vo de Lösige(4): </label><input type="passwd" name="passwd" id="passwd"></form>');
        exit();
    } else {
        echo("Lueg nomol wo du agfange hesch ;)");
    }
?>