program <%= projectname %>;

{$R *.dres}

uses
  Vcl.Forms,
  WEBLib.Forms,
  <%= unitname %> in '<%= unitsource %>' {<%= formname %>: <%= formbaseclass %>} {<%= unithtmlsource %>};

{$R *.res}

begin
  Application.Initialize;
  Application.AutoFormRoute := True;
  Application.MainFormOnTaskbar := True;
  if not Application.NeedsFormRouting then
  Application.CreateForm(<%= formclass %>, <%= formname %>);
  Application.Run;
end.