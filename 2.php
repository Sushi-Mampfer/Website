<?php
    if (!($_POST["passwd"] == "sdpm")) {
        echo('<form action="1.php" method="post"><label for="passwd">Passwort: </label><input type="passwd" name="passwd" id="passwd"></form>');
        exit();
    } else {
        echo("eltere bad");
    }
?>