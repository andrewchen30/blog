// 將 -> 更換成 i.fa.fa-arrow-right

var article = $('#main').html();
var scriptStart = article.indexOf('<script>');
article = article.substring(0, scriptStart); // 移除這串 script
article = article.replace(/-&gt;/g, '<i class="fa fa-arrow-right" aria-hidden="true"></i>');
$('#main').html(article);
</script>