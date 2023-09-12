<?php
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
echo "<div> <form action=\"index.php\" method=\"GET\">
  <label for=\"titles\">Titel:</label><br>
  <input type=\"text\" id=\"titles\" name=\"title\"><br>
  <label for=\"notes\">Notiz:</label><br>
  <input type=\"text\" id=\"notes\" name=\"note\"><br>
  <label for=\"ports\">Port:</label><br>
  <input type=\"number\" id=\"ports\" name=\"port\" min=\"1\" max=\"5\"><br>
  <input type=\"submit\">
</form>  </div>";
if (!empty($_GET['title'])) {
  $title = $_GET["title"];
  $note = $_GET["note"];
  $port = $_GET["port"];
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
  while($row = mysqli_fetch_assoc($result)) {
    echo "<div> <a href=\"index.php?delete=" . $row["id"] . "\" >Delete</a> <p>Titel: " . $row["title"]. "</p> <p>Notiz: " . $row["note"]. "</p> <p>Port:" . $row["port"]. "</p> </div>";
  }
} else {
  echo "0 results";
}

mysqli_close($conn);
?>
