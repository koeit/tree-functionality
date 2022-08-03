# Example Project
A ReactJS project, written in TypeScript which implements a (UI Framework) Tree and it´s functionality. The functionality manages a object array with 0...n children of the same object array. This managed object array will be mapped (after changes are made) to a styled data array which the tree component needs.

The goal :checkered_flag: of this is to reach a separation between data and styled data for easy efficient data manipulation.

- Used UI Frameworks:
  - :heavy_check_mark: [ant.design](https://ant.design/)
  - :x: [mui.com](https://mui.com)

## Functionality contains:
- :x: Lazy data loading simulation (real world usecase is to get only needed data from backend & database)
- :heavy_check_mark: Add root node 
- :x: Add child node
- :x: Delete root/child node
- :x: Rename root/child node
- :heavy_check_mark: TreeData manipulation in whole project (mobx store)
- :x: alphabetical sorting of root/child nodes
- :x: manual sorting via drag&drop of root/child nodes
- :heavy_check_mark: separation between data and styled data