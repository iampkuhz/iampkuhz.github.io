require "rubygems"
require "rake"


desc "synchronize qiniu folder to remote server with qiniu sync tool"
task :qrsync do
  bin = "qrsync"
  json = "qiniu.json"
  ignore = ".gitignore"
  filebin = File.join(Dir.pwd, bin)
  filejson = File.join(Dir.pwd, json)
  fileignore = File.join(Dir.pwd, ignore)

  abort("rake aborted: '#{filebin}' file not found.") unless File.exist?(filebin)

  unless File.exist?(filejson)
    open(filejson, 'w') do |json|
      json.puts '{'
      json.puts '    "access_key": "your access key",'
      json.puts '    "secret_key": "your secret_key",'
      json.puts '    "bucket": "your bucket name",'
      json.puts '    "sync_dir": "local directory to upload",'
      json.puts '    "async_ops": "",'
      json.puts '    "debug_level": 1'
      json.puts '}'
    end
    if File.exist?(fileignore)
      unless File.open(fileignore).each_line.any?{ |line| line.include?(json) }
        open(fileignore, 'a') { |ignore| ignore.puts "#{json}" }
      end
    else
      open(fileignore, 'w') { |ignore| ignore.puts "#{json}" }
    end
    puts "please edit #{filejson}"
  else
    system "#{Dir.pwd}/qrsync #{filejson}"
  end

end
