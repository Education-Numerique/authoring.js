/*
* @template : application/header
*/
  <header id="header" role="banner">
    {{log this}}
    {{log controller}}
    {{log view}}
    {{log model}}
    {{log papa}}
    {{log this.papa}}
      <h1>
        <a href="./">LxxL</a>
      </h1>
  </header>

  <p id="search">
    <input type="text" placeholder="Search..."/><button type="submit" class="tip-right" title="Search"><i class="icon-search icon-white"></i></button>
  </p>
  <nav id="user-nav" class="navbar" role="navigation">
    <ul class="nav btn-group">
      <li class="btn btn-inverse" ><a title="" href="#"><i class="icon icon-user"></i><span class="text">Profile</span></a></li>
      <li class="btn btn-inverse dropdown" id="menu-messages"><a href="#" data-toggle="dropdown" data-target="#menu-messages" class="dropdown-toggle"><i class="icon icon-envelope"></i> <span class="text">Messages</span> <span class="label label-important">5</span> <b class="caret"></b></a>
          <ul class="dropdown-menu">
              <li><a class="sAdd" title="" href="#">new message</a></li>
              <li><a class="sInbox" title="" href="#">inbox</a></li>
              <li><a class="sOutbox" title="" href="#">outbox</a></li>
              <li><a class="sTrash" title="" href="#">trash</a></li>
          </ul>
      </li>
      <li class="btn btn-mini btn-inverse"><a title="" href="#"><i class="icon icon-cog"></i> <span class="text">Settings</span></a></li>
      <li class="btn btn-mini btn-inverse"><a title="" href="login.html"><i class="icon icon-share-alt"></i> <span class="text">Logout</span></a></li>
    </ul>
  </nav>


  <nav id="sidebar">
    <a href="#" class="visible-phone"><i class="icon icon-home"></i> Dashboard</a>
    <ul>
      <li class="active"><a href="index.html"><i class="icon icon-home"></i> <span>Dashboard</span></a></li>
      <li class="submenu">
        <a href="#"><i class="icon icon-th-list"></i> <span>Form elements</span> <span class="label">3</span></a>
        <ul>
          <li><a href="form-common.html">Common elements</a></li>
          <li><a href="form-validation.html">Validation</a></li>
          <li><a href="form-wizard.html">Wizard</a></li>
        </ul>
      </li>
      <li><a href="buttons.html"><i class="icon icon-tint"></i> <span>Buttons &amp; icons</span></a></li>
      <li><a href="interface.html"><i class="icon icon-pencil"></i> <span>Interface elements</span></a></li>
      <li><a href="tables.html"><i class="icon icon-th"></i> <span>Tables</span></a></li>
      <li><a href="grid.html"><i class="icon icon-th-list"></i> <span>Grid Layout</span></a></li>
      <li class="submenu">
        <a href="#"><i class="icon icon-file"></i> <span>Sample pages</span> <span class="label">4</span></a>
        <ul>
          <li><a href="invoice.html">Invoice</a></li>
          <li><a href="chat.html">Support chat</a></li>
          <li><a href="calendar.html">Calendar</a></li>
          <li><a href="gallery.html">Gallery</a></li>
        </ul>
      </li>
      <li>
        <a href="charts.html"><i class="icon icon-signal"></i> <span>Charts &amp; graphs</span></a>
      </li>
      <li>
        <a href="widgets.html"><i class="icon icon-inbox"></i> <span>Widgets</span></a>
      </li>
    </ul>
  </nav>
