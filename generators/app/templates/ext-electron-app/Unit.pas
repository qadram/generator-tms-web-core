unit <%= unitname %>;

interface

uses
  System.SysUtils, System.Classes, JS, Web, WEBLib.Graphics, WEBLib.Controls,
  WEBLib.Forms, WEBLib.Electron, WEBLib.Dialogs;

type
  <%= formclass %> = class(<%= formbaseclass %>)
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  <%= formname %>: <%= formclass %>;

implementation

{$R *.dfm}

initialization
  RegisterClass(<%= formclass %>);

end.