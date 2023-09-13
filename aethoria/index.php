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
echo "<div class=\"left\"> <div> <form action=\"index.php\" method=\"POST\">
  <label for=\"titles\">Titel:</label><br>
  <input type=\"text\" id=\"titles\" name=\"title\"><br>
  <label for=\"notes\">Notiz:</label><br>
  <input type=\"text\" id=\"notes\" name=\"note\"><br>
  <label for=\"ports\">Port:</label><br>
  <input type=\"number\" id=\"ports\" name=\"port\" min=\"1\" max=\"65535\"><br>
  <input type=\"submit\">
</form>  </div> <div> <p>1234</p> <p>1234</p> <p>1234</p> <p>1234</p> <p>1234</p> <p>1234</p></div></div>";
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
    echo "<div> <p>" . $row["title"]. "</p> <a href=\"index.php?delete=" . $row["id"] . "\" >Delete</a> <br> <p>" . $row["note"]. "</p> <p>Port:" . $row["port"]. "</p> </div>";
  }
  echo "</div>";
} else {
  echo "0 results";
}

mysqli_close($conn);
?>
