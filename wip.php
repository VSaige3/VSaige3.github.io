<html>
  <body>
    <?php
      echo "<h2 align='center'>";
      if(!empty($_GET()['name'])) { echo "The project \"" . $_GET()['name'] . "\" does not exist yet!"; }
      else { echo "The project you are looking for does not exist yet"; }
      echo "</h2><br/>Come again later!<br/>";
      echo "<br/><br/>";
      if(!empty($_GET()['from'])) { echo "<a href=\"" . $_GET['from'] . "\">Go back</a>"; }
    ?>
  </body>
</html>
