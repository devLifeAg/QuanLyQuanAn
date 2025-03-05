<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ban extends Model
{

    protected $table = 'ban';
    public $timestamps = false;
    protected $primaryKey = 'b_id';

    protected $fillable = [
        'b_tenbang',
        'b_trangthai',
        't_id',
    ];

    public function thuoctang()
    {
        return $this->belongsTo(Tang::class, 't_id', 't_id'); //class, foreignkey, localkey
    }
}
