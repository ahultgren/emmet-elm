# emmet-elm

An Emmet filter for Elm Html.

## Installation

**Currently only works with Atom.** However, the plan is to submit this to Emmet
core after it has gotten some usage and testing.

1. `cd ~/.atom/packages` (or whatever the path to your Atom packages are)
2. `git clone git@github.com:ahultgren/emmet-elm.git`
3. Restart or reload Atom

This assumes you already have Emmet installed.

## Example

```emmet
form.form>input.field1[type=text][value=test]+input.field2[type=text][value=3]
```

Becomes:

```elm
form
  [ action ""
  , class "form"
  ]
  [ input
    [ type' "text"
    , class "field1"
    , value "test"
    ]
    [ 
    ]
  , input
    [ type' "text"
    , class "field2"
    , value "3"
    ]
    [ 
    ]
  ]
```

You will have to import the Html functions yourself. E.g:

```elm
import Html exposing (form, input)
import Html.Attributes exposing (class, type', value)
```

## TODO

* Automatic tests
* Submit to Emmet
