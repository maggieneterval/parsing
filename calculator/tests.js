describe("calculator", function() {
  it("can parse a a single digit number", function() {
    expect(calc("4")).toEqual(4);
  })

  it("can parse a number without a decimal", function() {
    expect(calc("428")).toEqual(428);
  })

  it("can parse a number with a decimal", function() {
    expect(calc("428.27")).toEqual(428.27);
  })

  it("handles negative numbers", function() {
    expect(calc("-3")).toEqual(-3);
  });

  it("can handle addition of two numbers", function() {
    expect(calc("1+2")).toEqual(3);
  });

  it("can handle subtraction of two numbers", function() {
    expect(calc("4-2")).toEqual(2);
  });

  it("handles any number of addition and subtraction statements", function() {
    expect(calc("4+2+1-2+2")).toEqual(7);
  });

  it("handles multiplication statements", function() {
    expect(calc("2*3")).toEqual(6);
  })

  it("handles division statements", function() {
    expect(calc("8/2)")).toEqual(4);
  })

  it("handles any number of multiplication statements", function() {
    expect(calc("5*3*4*8*2")).toEqual(960);
  })

  it("handles any number of division statements", function() {
    expect(calc("(100/2/5/5")).toEqual(2);
  })

  it("handles a math expression with parentheses", function() {
    expect(calc("(5-3*4)")).toEqual(-7);
  })

  it("handles more complicated mathmatical expressions", function() {
    expect(calc("(5 - -(3 + (2 * 2 / 2) *(4 / 2)))")).toEqual(12);
  })
});
