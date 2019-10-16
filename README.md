# EasyAdmin sortable bundle

This bundle provides a convenient way to make your entities sortable as well as a drag-and-drop in the
EasyAdmin list view.

The javascript and css was copied from [treetop1500/easyadmin-dragndrop-sort
](https://github.com/treetop1500/easyadmin-dragndrop-sort) with some minor improvements.

# Installation

Install the bundle using composer:

```bash
$ composer req torfs-ict/ea-sortable-bundle
```

Add the bundle routing to `config/routes.yaml`:

```yaml
ea-sortable:
  resource: '@OrkestraEaSortableBundle/Controller/'
  type: annotation
```

# Usage

## Using the sortable trait

Add the `Orkestra\EaSortable\SortableTrait` trait to your entity. Below is the sample configuration for 
EasyAdmin.

```yaml
easy_admin:
  entities:
    SortableEntity:
      class: App\Entity\SortableEntity
      list:
        sort: ['position', 'ASC']
        actions:
          - delete
          - edit
          - new
          - search
          - { name: sort, template: '@OrkestraEaSortable/ea-sortable.html.twig' }
        fields:
          - { property: id, label: '$Id', sortable: false }
          - { property: name, label: Name, sortable: false }
```

Some notes about the configuration:

1. setting the `sort` option is mandatory, obviously
2. you need to provide the custom `sort` action in order to enable the drag-and-drop functionality
3. sorting must be disabled on all other list fields (there is no way to do this globally in EasyAdmin)

## Without the sortable trait

As long as your sorting property is called `position` you can simply follow the same steps as when
using the sortable trait. If not you need to do the following things:

1. change the property in the `sort` option
2. configure the property on the `sort` action

The following example assumes the sorting property is named `index`.

```yaml
easy_admin:
  entities:
    SortableEntity:
      class: App\Entity\SortableEntity
      list:
        sort: ['index', 'ASC']
        actions:
          - delete
          - edit
          - new
          - search
          - { name: sort, template: '@OrkestraEaSortable/ea-sortable.html.twig', property: index }
        fields:
          - { property: id, label: '$Id', sortable: false }
          - { property: name, label: Name, sortable: false }
```