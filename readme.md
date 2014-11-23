
##介绍
* Somnus示例项目是一个由Eclipse Kepler创建，Struts2.3.x+Spring3.2.x+Hibernate4.2.x+CXF2.7.x+ExtJs4.2+Maven架构的示例项目

### 核心功能
* 通用的DAO、Service、Controller抽象，从CRUD中解放
* 简单的分页、排序、查询抽象，更快的开发速度
* 借助spring实现简单的数据绑定、类型转换、验证、格式化
* 提供基础的用户、组织机构、资源等管理
* 提供基于资源的细粒度授权管理，灵活的授权模型
* 提供常用功能的用例，直接拿来用即可，比如树、可移动列表（即如排序的分类）、父子表、编辑器、文件上传、大数据量Excel导入导出等等
* 监控功能，比如缓存管理（命中率、缓存控制等）、二级缓存管理、JVM状态、数据库（druid做的很好了，直接用它的）等等
* 维护功能，比如图标管理、强大的在线编辑功能（直接在线编辑JSP，无需来回切服务器，上传下载等等）、静态资源管理（自动的压缩、版本化js/css）、动态增删任务调度
* 站内信功能，支持嵌套展示等
* 通知系统：耗时功能异步化，完成后使用通知系统通知
* 通用的文件上传/下载、通用的验证模型等等
* ……

### 技术选型

#### 管理
* maven依赖和项目管理
* git版本控制

#### 后端
* IoC容器 spring
* web框架 struts2
* orm框架 hibernate + spring data jpa
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
* jquery-fileupload 文件上传
* bootstrap-datatimepicker 日历选择

#### 数据库
 * 目前已经过测试通过的数据库有MySql5、Oracle10g、SqlServer2005


###支持的浏览器
 * chrome
 * firefox（目前使用firefox 19.0.2测试）
 * opera 12
 * ie7及以上（建议ie9以上，获取更好的体验）
 * 其他浏览器暂时未测试

##如何运行

####1、到es/web/pom.xml修改数据库配置：
*  默认修改：Somnus\src\main\resources\config.properties下的
*  jdbc.username
*  jdbc.password
*  在你的数据库中，新建一个仓库，名字必须和jdbc.url中的一致

####2、到项目的根下
* maven install.bat 安装jar包到本地仓库（jdk6即可）
* maven jetty run.bat 启动web应用 默认端口9999 可以到Somnus/pom.xml下修改