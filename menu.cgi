#!/usr/bin/perl

use strict;
use warnings;
sub htmlEnv {
	print "<TABLE CELLPADDING=2 CELLSPACING=1 WIDTH=0 BORDER=1>\n";
	foreach $name ( keys %ENV )
	{
		print "<TR><TD>$name</TD><TD>$ENV{$name}</TD></TR>\n";
	}
	print "</TABLE>\n";
}

sub totable
{
	my $line = shift;
	while( $line =~ s/^(..).// ) {
		print '<td>', $1, '</td>', "\n" ;
		if( $line =~ /^ / ) {
			$line =~ s/^ //;
			print '<td></td>', "\n";
		}
	}
}


sub oneLine {
	my $line;
	#print "Needline=$needline Keyword=$keyword Field=$field\n";
	if( $needline == 0) {
		$needline = 1;
		return $keyword;
	}
	while( $line = <INPUT> ) {
		$line =~ s/^#.*$//;
		next if ($line =~ /^ *$/);
		if( $line =~ /^([a-zA-Z]*):* +(.*)$/) {
			$keyword = $1;
			$field = $2;
		} elsif ( $line =~ /^([a-zA-Z]*): *$/) {
			$keyword = $1;
			$field = "";
		} else {
			next;
		}
		#print "Line $line Keyword=$keyword Field=$field\n";
		$needline = 1;
		return $keyword;
	}
	return "";
}

sub oneItem {
	my $item = shift;
	my $archive = shift;
	my $title = shift;
	my $pvlist = 0;

	while(1) {
		oneLine;
		if( $keyword =~ /^ARCHIVE/i) {
			$archive = $field;
			next;
		}
		if( $keyword =~ /^PVNAMES/i) {
			$pvlist = join('&pv=', split(/[, ]+/, $field));
			$pvlist = "pv=$pvlist";
			next;
		}
		if( $keyword =~ /^PATTERN/i) {
			$pvlist = "PATTERN=$field";
			next;
		}
		if( $keyword =~ /^PVLIST/i) {
			$pvlist = $field;
			next;
		}
		if( $keyword =~ /^MENU/i) {
			oneMenu( $field, $archive, $item);
			next;
		}
		if( $pvlist ) {
			( $h1 = "$title: $item" ) =~ s/ /%20/g;
			$h1 =~ s/#/%23/g;
			#print "<li><a href=\"buildCalendar.cgi?ARCHIVE=$archive&H1=$h1&$pvlist\">\&middot;$item</a></li>\n";
			#print "<!-- \$pvlist=$pvlist -->\n";
			if(substr($pvlist, 0, 3) eq 'pv='){
				print "<li><a href=\"http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?$pvlist\">$item</a></li>\n";
				#print "<li><a href=\"#\"><span>NO DATA</span></a></li>";
				#print "</ul>\n\n";
			}
			if(substr($pvlist, 0, 7) eq 'PATTERN'){
				$pvlist =~ s/PATTERN/pv/;
				$pvlist =~ s/\$/%24/g;
				$pvlist =~ s/\*/%2A/g;
				$pvlist =~ s/\:/%3A/g;
				$pvlist =~ s/\[/%5B/g;
				$pvlist =~ s/\:/%5C/g;
				$pvlist =~ s/\]/%5D/g;
				$pvlist =~ s/\_/%5F/g;
				$pvlist =~ s/\|/%7C/g;
				print "<li><a href=\"http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&$pvlist\">$item</a></li>\n";
			}
			
		#%24 : $
		#%2A : *
		#%3A : :
		#%5B : [
		#%5C : 
		#%5D : ]
		#%5F : _
		#%7C : |
		
			 #http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv=TM1408-01&pv=TM1408-02&pv=TM1408-03&pv=TM1408-04&pv=TM1408-05&pv=TM1408-06&pv=TM1408-07&from=2019-05-22T14:12:34.758Z&to=2019-05-22T15:12:34.758Z
			
			#sed -e 's/buildCalendar.cgi?.*ARCHIVE=\(.*\)&H1=.*NAMES=/http:\/\/vm-archiver-02.clsi.ca:17668\/retrieval\/ui\/viewer\/archViewer.html?pv=/g' -e 's/%0D%0A/\&pv=/g' -e 's/\&pv="/"/' menu.cgi.html
		}
		$needline = 0;
		return;
	}
}

sub oneMenu {
	my $level = shift;
	my $archive = shift;
	my $title = shift;

	if($level ne "main"){
		print "<li class=\"has-sub\"><a href=\"#\"><span>$title</span></a>\n";
		print "<ul>\n";
	}

	while( 1) {
		oneLine;
		#print "Checking $keyword\n";
		if( $keyword =~ /^ITEM/i) {
			oneItem ($field, $archive, $title);
			next;
		}
		if( $keyword =~ /^MENU/i) {
			oneMenu( $field, $archive, $title);
			next;
		}
		if( $keyword =~ /^ARCHIVE/i) {
			$archive = $field;
			next;
		}
		if( $keyword =~ /^END/i) {
			#print "</ul></li>\n";
			if( $level != $field) {
				$needline = 0;
			}
			last;
		}
	}
	
	if($level ne "main"){
		print "</ul></li>\n";
	}
	
}

sub makequery {
	my $q = shift;
	%keys = ();
	while ($q =~ s/^ *([^=]*)=([^&]*)&*// ) {
		$keys{$1} = $2;
		#print "\%keys\{$1\} = $2<br>\n";
	}
}

sub findquery {
	my $q = shift;
	return $keys{$q};
}

#
# BEGIN MAIN
#

print "<!doctype html>\n";
print "<html lang=''>\n";
print "<head>\n";
print "   <meta charset='utf-8'>\n";
print "   <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n";
print "   <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n";
print "   <title>EPICS Archive Appliance Interface</title>\n";
print "   <script src=\"http://code.jquery.com/jquery-latest.min.js\" type=\"text/javascript\"></script>\n";
print "   <script src=\"https://s3.amazonaws.com/menumaker/menumaker.min.js\" type=\"text/javascript\"></script>\n";
print "   <script src=\"script.js\"></script>\n";
print "   <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css\">\n";
print "   <link rel=\"stylesheet\" href=\"styles.css\">\n";
print "</head>\n";
print "<body>\n\n";

# htmlEnv;

$method = $ENV{"REQUEST_METHOD"};
$method = "GET" if ( $method =~ /^$/);

unless ( $method =~ /^GET$/) {
	print "Unsupported query type: $method\n";
	exit;
}
$query = $ENV{"QUERY_STRING"};

#print "Method: $method Query: $query<br>\n";
makequery($query);

open(INPUT, "menu.data") || print "No Input File!\n";
$needline = 1;
$IDNO=1000;

#print "<IMG SRC=\"../CLSlogo.png\">\n";
#print "<p>Click on a menu name to view that menu</p>";

print "<div id=\"cssmenu\">\n";
print "  <ul>\n";
print "     <li class=\"active\"><a href=\"#\" target=\"_blank\"><span><i class=\"fa fa-fw fa-home\"></i> Home</span></a></li>\n\n\n\n\n";


oneMenu("main", "", "CLS Channel Archive");

print "  </ul>\n";
print "</div>\n";
print "</body>\n";
print "</html>\n";
