##如何运行

####到Somnus修改数据库配置：
*  默认修改：Somnus\src\main\resources\env\configurations-dev.properties下的
*  jdbc.username
*  jdbc.password
*  在你的数据库中，新建一个仓库，名字必须和jdbc.url中的一致
*  修改完毕后，可以用maven命令直接启动查看效果，命令为mvn jetty:run，当然你可以直部署到tomcat中，按常规方式启动
*  再重申一遍，此项目无需你建表，都由项目启动的时候自动完成，你只需要创建一个数据库，如somnus，就可以了，最后就是初始化数据也是自动插入的，别再找我要了


##介绍
* Somnus示例项目是一个由Struts2.3.x+Spring3.2.x+Hibernate4.2.x+CXF2.7.x+ExtJs4.2+Maven架构的示例项目
* 系统可作为OA、网站、电子政务、ERP、CRM、APP后台等基于B/S架构的应用软件系统的快速开发框架

### 核心功能
* 通用的Dao、Service、Action抽象，从CRUD中解放
* 使用了ExtJs4的MVC架构，同时又实现了按需加载js，点击菜单才会加载对应的js文件和请求
* 简单的分页、排序、查询抽象，Extjs公共组件抽取成模板，只需继承，更快的开发速度
* 借助Spring实现简单的数据绑定、类型转换、验证、格式化
* 提供基础的用户、组织机构、资源、角色等管理
* 提供基于资源的细粒度授权管理，灵活的授权模型
* 提供常用功能的用例，直接拿来用即可，比如下拉树、可移动列表（即如排序的分类）、父子表、编辑器、文件上传、大数据量Excel导入导出等等
* 监控功能，比如缓存管理（命中率、缓存控制等）、二级缓存管理、JVM状态、数据库（druid做的很好了，直接用它的）等等
* 维护功能，比如图标管理、动态增删任务调度
* 站内信功能，支持嵌套展示等
* 通知系统：耗时功能异步化，完成后使用通知系统通知
* 通用的文件上传/下载、通用的验证模型等等
* ……

### 技术选型

#### 管理
* maven依赖和项目管理
* git版本控制

#### 后端
* IOC容器 spring
* WEB框架 struts2
* ORM框架 hibernate + spring data jpa
* 安全框架 shiro
* 验证框架 hibernate validator
* 任务调度框架 quartz
* 缓存 ehcache
* 数据源 druid
* 日志 slf4j+logback
* Json fastjson


#### 前端
* extjs4 
* jquery-cookie 

#### 数据库
 * 目前已经过测试通过的数据库有MySql5、Oracle10g、SqlServer2005


###支持的浏览器
 * chrome
 * firefox（目前使用firefox 19.0.2测试）
 * opera 12
 * ie7及以上（建议ie9以上，获取更好的体验）
 * 其他浏览器暂时未测试
