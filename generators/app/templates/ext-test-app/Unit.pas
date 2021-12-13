unit <%= unitname %>;

interface

uses
  WEBLib.UnitTesting.Classes;

type
{$M+}
  // Example of a class containing methods with unit tests.
  // Mark it with [TestFixture] custom attribute and register with
  // TTMSWEBUnitTestingRunner as shown below.
  [TestFixture]
  <%= formclass %> = class(<%= formbaseclass %>)
  published
    // Example method that contains a unit test. Annotate it with [Test]
    [Test]
    procedure TestIntToStr;
  end;
{$M-}

implementation

uses
  SysUtils;

{ <%= formclass %> }

procedure <%= formclass %>.TestIntToStr;
begin
  // Use static methods of Assert to specify your test condition.
  Assert.AreEqual('42', IntToStr(42));
end;

initialization
  //Registration of the test classes.
  TTMSWEBUnitTestingRunner.RegisterClass(<%= formclass %>);

end.