#!/usr/bin/perl

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



                                #print "<li><a href=\"http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&$pvlist\">$item</a></li>\n";
				print "<li><a href=\"../newCalendar.html?H1=$h1&$pvlist\" >$item</a></li>\n";
				#print "<li><a href=\"#\"><span>NO DATA</span></a></li>";
				#print "</ul>\n\n";
			}
			if(substr($pvlist, 0, 7) eq 'PATTERN'){
				#$pvlist =~ s/PATTERN/pv/;
				$pvlist =~ s/\$/%24/g;
				$pvlist =~ s/\*/%2A/g;
				$pvlist =~ s/\:/%3A/g;
				$pvlist =~ s/\[/%5B/g;
				$pvlist =~ s/\]/%5D/g;
				$pvlist =~ s/\_/%5F/g;
                                $pvlist =~ s/\|/%7C/g;
				$pvlist =~ s/\^/%5E/g;
				$pvlist =~ s/\./%2E/g;
				
				#print "<li><a href=\"../newCalendar.html?H1=$h1&$pvlist\">$item</a></li>\n";
				print "<li><a href=\"http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&$pvlist\">$item</a></li>\n";

		#%24 : $
		#%2A : *
		#%3A :
		#%5B : [
		#%5C : 
		#%5D : ]
		#%5F : _
		#%7C : |
			}
		}

		$needline = 0;
		return;
	}
}

sub oneMenu {
	my $level = shift;
	my $archive = shift;
	my $title = shift;

	print "<li>";
	print "<script type=\"text/javascript\">document.writeln('<IMG id=\"img$IDNO\" src=\"../closed.png\" alt=\"Open List\" onclick=\"toggle(\\'img$IDNO\\',\\'li$IDNO\\');\"/>');</script>\n";
	print "<a href=\"#\" onclick=\"javascript:{toggle('img$IDNO','li$IDNO');return false;}\">$title</a>\n";
	print "</li><li id=\"li$IDNO\">\n";
	print "<script type=\"text/javascript\">document.getElementById('li$IDNO').style.display=\"none\";</script>\n";
	print "<ul>\n";
	$IDNO = $IDNO + 1;

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
			if( $level != $field) {
				$needline = 0;
			}
			last;
		}
	}
	print "</ul></li>\n";
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

print "Content-type: text/html\n";
# print "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\n";
# print "   \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n";
print "\n"; 
print "<HTML>\n";
print "<META Creator: EPICS CA menu.cgi>\n";
print "<head>\n";
print "<title>CA Archive Menu</title>\n";
print "<base target=\"display\">\n";
print "<script>\n";
print "// this function toggles the status of a list \n";
print "function toggle(image,list){ \n";
print "var listElementStyle=document.getElementById(list).style; \n";
print "if (listElementStyle.display==\"none\"){ \n";
print "listElementStyle.display=\"block\"; \n";
print "document.getElementById(image).src=\"../open.png\"; \n";
print "document.getElementById(image).alt=\"Close list\"; }\n";
print "else{ listElementStyle.display=\"none\"; \n";
print "document.getElementById(image).src=\"../closed.png\"; \n";
print "document.getElementById(image).alt=\"Open list\";\n";
print " } \n";
print "} </script>\n";

print "</head>\n";
print "<body>\n";

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
print "<IMG SRC=\"../CLS_Logo_Only.png\">\n";
print "<p>Click on a menu name to view that menu</p>";
print "<div id=\"menu\">\n";
oneMenu("main", "", "CLS Channel Archive");
print "</div>\n";

print "</body>\n";
print "</html>\n";
