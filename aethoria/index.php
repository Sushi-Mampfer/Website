<?php
echo "<link rel='stylesheet' href='style.css'>";
$servername = "localhost";
$username = "aethoria";
$password = "Test1234!";
$dbname = "aethoria";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
echo "<div class=\"left\"> <div class=\"top\"> <form action=\"index.php\" method=\"POST\">
  <label for=\"titles\">Titel:</label><br>
  <input maxlength=\"255\" type=\"text\" id=\"titles\" name=\"title\"><br>
  <label for=\"notes\">Notiz:</label><br>
  <input maxlength=\"1000\" type=\"text\" id=\"notes\" name=\"note\"><br>
  <label for=\"ports\">Port:</label><br>
  <input type=\"number\" id=\"ports\" name=\"port\" min=\"1\" max=\"65535\"><br>
  <input type=\"submit\">
</form>  </div> <div class=\"bottom\"> <p>1234</p> <p>1234</p> <p>1234</p> <p>1234</p> <p>1234</p> <p>1234</p></div></div>";
if (!empty($_POST['title'])) {
  $title = $_POST["title"];
  $note = $_POST["note"];
  $port = $_POST["port"];
  $sql = "INSERT INTO `notes` (`id`, `title`, `note`, `port`) VALUES (NULL, ?, ?, ?); ";
  $stmt = mysqli_prepare($conn, $sql);
  mysqli_stmt_bind_param($stmt, "ssi", $title, $note, $port);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
}
if (!empty($_GET['delete'])) {
  $id = $_GET["delete"];
  $sql = "DELETE FROM notes WHERE id = ?";
  $stmt = mysqli_prepare($conn, $sql);
  mysqli_stmt_bind_param($stmt, "i", $id);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);
}
$sql = "SELECT id, title, note, port FROM notes";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  echo "<div class=\"right\">";
  while($row = mysqli_fetch_assoc($result)) {
    echo '<div>';
        echo '<div class="righttop">';
        echo '<p>' . $row["title"] . '</p>';
        echo '<a href="index.php?delete=' . $row["id"] . '">Delete</a>';
        echo '</div>';
        echo '<p>' . $row["note"] . '</p>';
        
        // Check if 'port' is not zero
        if ($row["port"] != 0) {
            echo '<p class="port">Port:' . $row["port"] . '</p>';
        }
        
        echo '</div>';
    } else {
        echo 'No data available.';
    }
  }
  echo "</div>";
} else {
  echo "0 results";
}

mysqli_close($conn);
?>
