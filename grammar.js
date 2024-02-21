module.exports = grammar({
  name: 'Raku',

  rules: {
    // TODO: add the actual grammar 
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.class_definition,
      $.multimethod_definition,
      $.subroutine_definition,
      $.return_statement
    ),

    class_definition: $ => seq(
      'class',
      $.identifier,
      // TODO add is and does declaration
      $.block
    ),

    multimethod_definition: $ => seq(
      'multi',
      optional('sub'),
      $.identifier,
      $.parameter_list,
      $.block
    ),

    subroutine_definition: $ => seq(
      'sub',
      $.identifier,
      $.parameter_list,
      $.block
    ),

    var_definition: $ => seq(
      'my',
      $.identifier,
      '=',
      $.identifier
    ),

    parameter_list: $ => seq(
      '(',
      optional(commaSep1($.variable_name)),
      ')'
    ),

    parameter: $ => choice(
      // $.typed_parameter,
      // $.keyword_parameter
      $.untyped_parameter
    ),

    untyped_parameter: $ => field(
      'parameter',
      $.identifier
    ),

    // typed_parameter: $ => seq(

    // ),

    block: $ => seq(
      '{',
      repeat($._statement),
      '}',
    ),

    return_statement: $ => seq(
      'return',
      ';'
    ),
    // _conditionals: $ => choice('if', 'unless'),

    // subroutine_declaration_statement: $ => seq(
    //   'sub',
    //   field('name', $.bareword),
    //   field('signature', $.signature),
    //   field('block', $.block)
    // ),

    // signature: $ => (

    // ),

    // TODO change these to match the actual definitions
    // identifier: $ => /[\p{L}]+/,
    extended_identifier: $ => /[\p{L}]+/,
    compound_identifier: $ => /[\p{L}]+/,

    identifier: $ => choice(
      seq('$', $.bareword),
      seq('@', $.bareword),
      seq('%', $.bareword),
      seq("\\", $.bareword),
      $.bareword,
    ),

    bareword: $ => {
      const alpha = /[\p{Letter}\p{Mark}]+/;
      const dashThenAlphanumeric = /(-\p{L})?[\p{Letter}\p{Mark}\p{Number}]+/;
      const quoteThenAlphanumeric = /('\p{L})?[\p{Letter}\p{Mark}\p{Number}]+/;
      return token(seq(alpha, repeat(choice(dashThenAlphanumeric, quoteThenAlphanumeric))));
    },

    number: $ => /[\p{N}]+/,
    // identifier: $ => prec(2, $._identifier),
    // _identifier: $ => /[a-zA-Z_]\w*/,

    // bareword: $ => prec.dynamic(1, $._bareword),
    // // _bareword is at the very end b/c the lexer prefers tokens defined earlier in the grammar
    // _bareword: $ => choice($._identifier, /((::)|([a-zA-Z_]\w*))+/), // TODO: unicode
    // ...primitives,
  }
})

/**
 * Creates a rule to match one or more of the rules separated by a comma
 */
function commaSep1(rule) {
  return sepBy1(',', rule);
}

/**
 * Creates a rule to optionally match one or more of the rules separated by a comma
 */
function commaSep(rule) {
  return sepBy(',', rule);
}

/**
 * Creates a rule to optionally match one or more of the rules separated by a separator
 */
function sepBy(sep, rule) {
  return optional(sepBy1(sep, rule));
}

/**
 * Creates a rule to match one or more of the rules separated by a separator
 */
function sepBy1(sep, rule) {
  return seq(rule, repeat(seq(sep, rule)));
}
