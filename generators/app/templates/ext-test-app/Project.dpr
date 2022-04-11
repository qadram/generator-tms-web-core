program <%= projectname %>;

uses
  Vcl.Forms,
  WEBLib.Forms,
  <%= unitname %> in '<%= unitsource %>' {<%= formname %>: <%= formbaseclass %>} {<%= unithtmlsource %>};

{$R *.res}

begin
  Application.Initialize;
  Application.MainFormOnTaskbar := True;
  Application.Run;
end.
